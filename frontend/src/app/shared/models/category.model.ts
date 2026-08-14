export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}

export type CategoryInput = Omit<Category, 'id' | 'createdAt'>;
