import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFFICULTY_OPTIONS, resolveImageUrl } from '../../../shared/constants';
import { Category, RecipeDifficulty } from '../../../shared/models';
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

  readonly form: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    ingredients: FormControl<string>;
    instructions: FormControl<string>;
    preparationTime: FormControl<number>;
    servings: FormControl<number>;
    difficulty: FormControl<RecipeDifficulty>;
    imageUrl: FormControl<string>;
    categoryId: FormControl<number>;
  }>;

  get imagePreviewUrl(): string | null {
    return resolveImageUrl(this.form.controls.imageUrl.value);
  }

  constructor(
    fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly recipesService: RecipesService,
    private readonly categoriesService: CategoriesService,
  ) {
    this.form = fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      preparationTime: [30, [Validators.required, Validators.min(1)]],
      servings: [4, [Validators.required, Validators.min(1)]],
      difficulty: [RecipeDifficulty.EASY, Validators.required],
      imageUrl: [''],
      categoryId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe((categories) => {
      this.categories = categories;
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.recipeId = Number(idParam);

      this.recipesService.findOne(this.recipeId).subscribe((recipe) => {
        this.form.setValue({
          title: recipe.title,
          description: recipe.description ?? '',
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          preparationTime: recipe.preparationTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          imageUrl: recipe.imageUrl ?? '',
          categoryId: recipe.categoryId,
        });
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
        this.form.controls.imageUrl.setValue(imageUrl);
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.getRawValue();

    const request =
      this.isEditMode && this.recipeId
        ? this.recipesService.update(this.recipeId, value)
        : this.recipesService.create(value);

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
