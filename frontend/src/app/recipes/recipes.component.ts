import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Category, Recipe } from '../shared/models';
import { CategoriesService, RecipesService } from '../shared/services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  standalone: false,
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  search = '';
  categoryId: number | null = null;
  loading = false;

  private readonly searchChanged = new Subject<void>();

  constructor(
    private readonly recipesService: RecipesService,
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe((categories) => {
      this.categories = categories;
    });

    this.searchChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.loadRecipes());

    this.loadRecipes();
  }

  onSearchChange(): void {
    this.searchChanged.next();
  }

  onCategoryChange(): void {
    this.loadRecipes();
  }

  openRecipe(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  private loadRecipes(): void {
    this.loading = true;
    this.recipesService
      .findAll({
        search: this.search || undefined,
        categoryId: this.categoryId ?? undefined,
      })
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.loading = false;
      });
  }
}
