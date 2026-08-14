import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFFICULTY_OPTIONS, resolveImageUrl } from '../../../shared/constants';
import { Category, RecipeDifficulty, RecipeInput } from '../../../shared/models';
import { CategoriesService, RecipesService } from '../../../shared/services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  standalone: false,
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  isEditMode = false;
  recipeId: number | null = null;
  saving = false;
  uploadingImage = false;
  uploadError: string | null = null;
  categories: Category[] = [];
  difficultyOptions = DIFFICULTY_OPTIONS;

  form: RecipeInput = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    preparationTime: 30,
    servings: 4,
    difficulty: RecipeDifficulty.EASY,
    imageUrl: '',
    categoryId: 0,
  };

  get imagePreviewUrl(): string | null {
    return resolveImageUrl(this.form.imageUrl);
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly recipesService: RecipesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe((categories) => {
      this.categories = categories;
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.recipeId = Number(idParam);

      this.recipesService.findOne(this.recipeId).subscribe((recipe) => {
        this.form = {
          title: recipe.title,
          description: recipe.description ?? '',
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          preparationTime: recipe.preparationTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          imageUrl: recipe.imageUrl ?? '',
          categoryId: recipe.categoryId,
        };
      });
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.uploadError = null;
    this.uploadingImage = true;

    this.recipesService.uploadImage(file).subscribe({
      next: ({ imageUrl }) => {
        this.form.imageUrl = imageUrl;
        this.uploadingImage = false;
      },
      error: () => {
        this.uploadError = 'Não foi possível enviar a imagem. Tente novamente.';
        this.uploadingImage = false;
      },
    });

    input.value = '';
  }

  onSubmit(): void {
    this.saving = true;

    const request =
      this.isEditMode && this.recipeId
        ? this.recipesService.update(this.recipeId, this.form)
        : this.recipesService.create(this.form);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/recipes']);
      },
      error: () => {
        this.saving = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/recipes']);
  }
}
