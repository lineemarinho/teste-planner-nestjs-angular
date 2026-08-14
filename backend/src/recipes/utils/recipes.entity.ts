import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/utils/categories.entity';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  ingredients: string;

  @Column({ type: 'text' })
  instructions: string;

  @Column()
  preparationTime: number;

  @Column()
  servings: number;

  @Column({ type: 'enum', enum: RecipeDifficulty })
  difficulty: RecipeDifficulty;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.recipes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
