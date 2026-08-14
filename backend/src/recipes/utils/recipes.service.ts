import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { ILike, Repository } from 'typeorm';
import { Recipe } from './recipes.entity';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { RecipesFilterDto } from './recipes-filter.dto';
import { PaginatedResult } from './paginated-result.interface';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
  ) {}

  async findAll(filter: RecipesFilterDto): Promise<PaginatedResult<Recipe>> {
    const page = filter.page ?? DEFAULT_PAGE;
    const limit = filter.limit ?? DEFAULT_LIMIT;

    const [data, total] = await this.recipesRepository.findAndCount({
      where: {
        ...(filter.search ? { title: ILike(`%${filter.search}%`) } : {}),
        ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
      },
      relations: { category: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    };
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
    const previousImageUrl = recipe.imageUrl;

    Object.assign(recipe, dto);
    const saved = await this.recipesRepository.save(recipe);

    if (
      previousImageUrl &&
      dto.imageUrl !== undefined &&
      dto.imageUrl !== previousImageUrl
    ) {
      await this.deleteImageFile(previousImageUrl);
    }

    return saved;
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipesRepository.remove(recipe);

    if (recipe.imageUrl) {
      await this.deleteImageFile(recipe.imageUrl);
    }
  }

  private async deleteImageFile(imageUrl: string): Promise<void> {
    const filePath = join(process.cwd(), imageUrl);

    try {
      await unlink(filePath);
    } catch {
      // Arquivo já não existe ou não pôde ser removido — não bloqueia a operação principal.
    }
  }
}
