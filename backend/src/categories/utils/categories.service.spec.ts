import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: jest.Mocked<Repository<Category>>;

  const baseCategory: Category = {
    id: 1,
    name: 'Sobremesas',
    description: 'Doces',
    createdAt: new Date(),
    recipes: undefined as never,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CategoriesService);
    repository = module.get(getRepositoryToken(Category));
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('returns the category when found', async () => {
      repository.findOne.mockResolvedValue(baseCategory);

      await expect(service.findOne(1)).resolves.toEqual(baseCategory);
    });

    it('throws NotFoundException when missing', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('merges the dto into the existing category and saves it', async () => {
      repository.findOne.mockResolvedValue({ ...baseCategory });
      repository.save.mockImplementation((c) => Promise.resolve(c as Category));

      const result = await service.update(1, { name: 'Sobremesas geladas' });

      expect(result.name).toBe('Sobremesas geladas');
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('removes the category after loading it', async () => {
      repository.findOne.mockResolvedValue(baseCategory);
      repository.remove.mockResolvedValue(baseCategory);

      await service.remove(1);

      expect(repository.remove).toHaveBeenCalledWith(baseCategory);
    });

    it('propagates NotFoundException for a missing category', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
