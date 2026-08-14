import { Category } from './category.model';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
  preparationTime: number;
  servings: number;
  difficulty: RecipeDifficulty;
  categoryId: number;
  category?: Category;
  createdAt: string;
}

export type RecipeInput = Omit<Recipe, 'id' | 'createdAt' | 'category'>;
