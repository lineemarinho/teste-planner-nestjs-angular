import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/utils';
import { Recipe, RecipeDifficulty } from '../recipes/utils';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const categoriesCount = await this.categoriesRepository.count();

    if (categoriesCount > 0) {
      return;
    }

    this.logger.log('Seeding categories and recipes...');

    const categories = await this.categoriesRepository.save(
      this.categoriesRepository.create([
        { name: 'Sobremesas', description: 'Doces e sobremesas' },
        { name: 'Massas', description: 'Pratos com massa' },
        { name: 'Saladas', description: 'Receitas leves e saudáveis' },
        { name: 'Carnes', description: 'Pratos principais com carne' },
      ]),
    );

    const [sobremesas, massas, saladas, carnes] = categories;

    await this.recipesRepository.save(
      this.recipesRepository.create([
        {
          title: 'Brigadeiro',
          description: 'Doce brasileiro clássico',
          ingredients: 'Leite condensado, chocolate em pó, manteiga, granulado',
          instructions:
            'Misture os ingredientes em uma panela e cozinhe em fogo baixo mexendo sempre até desgrudar do fundo. Deixe esfriar, enrole e passe no granulado.',
          preparationTime: 30,
          servings: 20,
          difficulty: RecipeDifficulty.EASY,
          categoryId: sobremesas.id,
        },
        {
          title: 'Pudim de Leite',
          description: 'Sobremesa cremosa com calda de caramelo',
          ingredients: 'Leite condensado, leite, ovos, açúcar',
          instructions:
            'Faça a calda de caramelo, bata os demais ingredientes no liquidificador, despeje na forma e asse em banho-maria por 1 hora.',
          preparationTime: 90,
          servings: 8,
          difficulty: RecipeDifficulty.MEDIUM,
          categoryId: sobremesas.id,
        },
        {
          title: 'Espaguete ao Alho e Óleo',
          description: 'Receita simples e rápida',
          ingredients: 'Espaguete, alho, azeite, salsinha, sal',
          instructions:
            'Cozinhe o espaguete. Doure o alho no azeite, junte a massa escorrida, tempere com sal e finalize com salsinha.',
          preparationTime: 20,
          servings: 4,
          difficulty: RecipeDifficulty.EASY,
          categoryId: massas.id,
        },
        {
          title: 'Lasanha à Bolonhesa',
          description: 'Clássico prato italiano em camadas',
          ingredients:
            'Massa de lasanha, molho bolonhesa, molho branco, queijo mussarela, parmesão',
          instructions:
            'Monte camadas alternadas de massa, molho bolonhesa e molho branco. Finalize com queijo e leve ao forno por 40 minutos.',
          preparationTime: 90,
          servings: 6,
          difficulty: RecipeDifficulty.HARD,
          categoryId: massas.id,
        },
        {
          title: 'Salada Caesar',
          description: 'Salada clássica com molho especial',
          ingredients: 'Alface romana, croutons, parmesão, molho caesar, frango grelhado',
          instructions:
            'Rasgue a alface, adicione o frango grelhado em tiras, croutons, parmesão e o molho. Misture bem antes de servir.',
          preparationTime: 25,
          servings: 2,
          difficulty: RecipeDifficulty.EASY,
          categoryId: saladas.id,
        },
        {
          title: 'Salada de Grão-de-Bico',
          description: 'Salada nutritiva e saborosa',
          ingredients: 'Grão-de-bico cozido, tomate, cebola roxa, pepino, azeite, limão',
          instructions:
            'Misture todos os ingredientes em uma tigela e tempere com azeite, limão, sal e pimenta a gosto.',
          preparationTime: 15,
          servings: 4,
          difficulty: RecipeDifficulty.EASY,
          categoryId: saladas.id,
        },
        {
          title: 'Picanha na Brasa',
          description: 'Churrasco tradicional brasileiro',
          ingredients: 'Picanha, sal grosso',
          instructions:
            'Tempere a picanha com sal grosso e leve à brasa alta, selando os dois lados. Deixe descansar antes de fatiar.',
          preparationTime: 45,
          servings: 6,
          difficulty: RecipeDifficulty.MEDIUM,
          categoryId: carnes.id,
        },
        {
          title: 'Strogonoff de Carne',
          description: 'Prato cremoso e reconfortante',
          ingredients: 'Carne em cubos, creme de leite, ketchup, mostarda, champignon, cebola',
          instructions:
            'Refogue a cebola e a carne, adicione champignon, ketchup e mostarda. Finalize com creme de leite e sirva com arroz e batata palha.',
          preparationTime: 40,
          servings: 4,
          difficulty: RecipeDifficulty.MEDIUM,
          categoryId: carnes.id,
        },
      ]),
    );

    this.logger.log('Seed finished.');
  }
}
