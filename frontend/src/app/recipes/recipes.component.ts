import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { resolveImageUrl } from '../shared/constants';
import { Category, Recipe } from '../shared/models';
import { CategoriesService, RecipesService } from '../shared/services';

const PAGE_SIZE = 12;

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
  categoryId = 0;
  loading = false;

  page = 1;
  total = 0;
  totalPages = 1;

  private readonly searchChanged = new Subject<string>();

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
      .subscribe(() => {
        this.page = 1;
        this.loadRecipes();
      });

    this.loadRecipes();
  }

  onSearchChange(): void {
    this.searchChanged.next(this.search);
  }

  onCategoryChange(): void {
    this.page = 1;
    this.loadRecipes();
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }

    this.page = page;
    this.loadRecipes();
  }

  openRecipe(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  resolveImageUrl(imageUrl?: string | null): string | null {
    return resolveImageUrl(imageUrl);
  }

  private loadRecipes(): void {
    this.loading = true;
    this.recipesService
      .findAll({
        search: this.search || undefined,
        categoryId: this.categoryId || undefined,
        page: this.page,
        limit: PAGE_SIZE,
      })
      .subscribe(({ data, total, totalPages }) => {
        this.recipes = data;
        this.total = total;
        this.totalPages = totalPages;
        this.loading = false;
      });
  }
}
