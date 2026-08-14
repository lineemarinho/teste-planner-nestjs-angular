import { RecipeDifficulty } from '../models';

export const DIFFICULTY_LABELS: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.EASY]: 'Fácil',
  [RecipeDifficulty.MEDIUM]: 'Médio',
  [RecipeDifficulty.HARD]: 'Difícil',
};

export const DIFFICULTY_OPTIONS = Object.values(RecipeDifficulty).map(
  (value) => ({
    value,
    label: DIFFICULTY_LABELS[value],
  }),
);
