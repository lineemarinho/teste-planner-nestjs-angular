import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Recipe } from './recipes.entity';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { RecipesFilterDto } from './recipes-filter.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
  ) {}

  findAll(filter: RecipesFilterDto): Promise<Recipe[]> {
    return this.recipesRepository.find({
      where: {
        ...(filter.search ? { title: ILike(`%${filter.search}%`) } : {}),
        ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
      },
      relations: { category: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  create(dto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipesRepository.create(dto);
    return this.recipesRepository.save(recipe);
  }

  async update(id: number, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findOne(id);
    Object.assign(recipe, dto);
    return this.recipesRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipesRepository.remove(recipe);
  }
}
