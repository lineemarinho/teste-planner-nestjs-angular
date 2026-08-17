import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../shared/models';
import { RecipesService } from '../../../shared/services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  standalone: false,
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  displayedColumns = ['title', 'category', 'difficulty', 'preparationTime', 'actions'];
  deletingId: number | null = null;

  constructor(
    private readonly recipesService: RecipesService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  onNew(): void {
    this.router.navigate(['/admin/recipes/new']);
  }

  onEdit(recipe: Recipe): void {
    this.router.navigate(['/admin/recipes', recipe.id, 'edit']);
  }

  onDelete(recipe: Recipe): void {
    if (!confirm(`Excluir a receita "${recipe.title}"?`)) {
      return;
    }

    this.deletingId = recipe.id;

    this.recipesService.remove(recipe.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadRecipes();
      },
      error: () => {
        this.deletingId = null;
      },
    });
  }

  private loadRecipes(): void {
    this.recipesService.findAll({ limit: 200 }).subscribe(({ data }) => {
      this.recipes = data;
    });
  }
}
