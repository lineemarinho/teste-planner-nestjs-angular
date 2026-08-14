import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFFICULTY_OPTIONS } from '../../../shared/constants';
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
    categoryId: 0,
  };

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
          categoryId: recipe.categoryId,
        };
      });
    }
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
