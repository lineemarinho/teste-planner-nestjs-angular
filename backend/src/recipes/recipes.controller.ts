import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../shared/decorators';
import {
  CreateRecipeDto,
  PaginatedResult,
  Recipe,
  recipeImageUploadOptions,
  RecipesFilterDto,
  RecipesService,
  UpdateRecipeDto,
} from './utils';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Public()
  @Get()
  findAll(
    @Query() filter: RecipesFilterDto,
  ): Promise<PaginatedResult<Recipe>> {
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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', recipeImageUploadOptions))
  uploadImage(@UploadedFile() file: Express.Multer.File): { imageUrl: string } {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    return { imageUrl: `/uploads/recipes/${file.filename}` };
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
