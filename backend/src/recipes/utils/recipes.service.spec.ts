import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { unlink } from 'fs/promises';
import { Repository } from 'typeorm';
import { Recipe, RecipeDifficulty } from './recipes.entity';
import { RecipesService } from './recipes.service';

jest.mock('fs/promises', () => ({
  unlink: jest.fn(),
}));

describe('RecipesService', () => {
  let service: RecipesService;
  let repository: jest.Mocked<Repository<Recipe>>;

  const baseRecipe: Recipe = {
    id: 1,
    title: 'Bolo de cenoura',
    description: 'Clássico',
    ingredients: 'Cenoura',
    instructions: 'Asse',
    preparationTime: 30,
    servings: 4,
    difficulty: RecipeDifficulty.EASY,
    imageUrl: '/uploads/recipes/old.jpg',
    categoryId: 1,
    category: undefined as never,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
            find: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(RecipesService);
    repository = module.get(getRepositoryToken(Recipe));
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('paginates with default page and limit', async () => {
      repository.findAndCount.mockResolvedValue([[baseRecipe], 1]);

      const result = await service.findAll({});

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 12 }),
      );
      expect(result).toEqual({
        data: [baseRecipe],
        total: 1,
        page: 1,
        limit: 12,
        totalPages: 1,
      });
    });

    it('computes skip/totalPages for a later page', async () => {
      repository.findAndCount.mockResolvedValue([[], 25]);

      const result = await service.findAll({ page: 3, limit: 10 });

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 20, take: 10 }),
      );
      expect(result.totalPages).toBe(3);
    });
  });

  describe('findOne', () => {
    it('returns the recipe when found', async () => {
      repository.findOne.mockResolvedValue(baseRecipe);

      await expect(service.findOne(1)).resolves.toEqual(baseRecipe);
    });

    it('throws NotFoundException when missing', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deletes the old image file when the image changes', async () => {
      repository.findOne.mockResolvedValue({ ...baseRecipe });
      repository.save.mockImplementation((r) => Promise.resolve(r as Recipe));

      await service.update(1, { imageUrl: '/uploads/recipes/new.jpg' });

      expect(unlink).toHaveBeenCalledWith(
        expect.stringContaining('/uploads/recipes/old.jpg'),
      );
    });

    it('does not delete the image when it is unchanged', async () => {
      repository.findOne.mockResolvedValue({ ...baseRecipe });
      repository.save.mockImplementation((r) => Promise.resolve(r as Recipe));

      await service.update(1, { title: 'Novo título' });

      expect(unlink).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deletes the associated image file', async () => {
      repository.findOne.mockResolvedValue({ ...baseRecipe });
      repository.remove.mockResolvedValue(baseRecipe);

      await service.remove(1);

      expect(unlink).toHaveBeenCalledWith(
        expect.stringContaining('/uploads/recipes/old.jpg'),
      );
    });

    it('does nothing when the recipe has no image', async () => {
      repository.findOne.mockResolvedValue({ ...baseRecipe, imageUrl: null });
      repository.remove.mockResolvedValue(baseRecipe);

      await service.remove(1);

      expect(unlink).not.toHaveBeenCalled();
    });
  });
});
