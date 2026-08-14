import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from '../shared/decorators';
import {
  CreateRecipeDto,
  Recipe,
  RecipesFilterDto,
  RecipesService,
  UpdateRecipeDto,
} from './utils';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Public()
  @Get()
  findAll(@Query() filter: RecipesFilterDto): Promise<Recipe[]> {
    return this.recipesService.findAll(filter);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
    return this.recipesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.recipesService.remove(id);
  }
}
