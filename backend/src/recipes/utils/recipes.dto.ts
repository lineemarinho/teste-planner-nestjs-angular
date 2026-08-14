import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { RecipeDifficulty } from './recipes.entity';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;

  @IsInt()
  @IsPositive()
  preparationTime: number;

  @IsInt()
  @IsPositive()
  servings: number;

  @IsEnum(RecipeDifficulty)
  difficulty: RecipeDifficulty;

  @IsInt()
  @IsPositive()
  categoryId: number;
}

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  preparationTime?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  servings?: number;

  @IsOptional()
  @IsEnum(RecipeDifficulty)
  difficulty?: RecipeDifficulty;

  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;
}
