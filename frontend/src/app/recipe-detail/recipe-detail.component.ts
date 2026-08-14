import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resolveImageUrl } from '../shared/constants';
import { Recipe } from '../shared/models';
import { RecipesService } from '../shared/services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  standalone: false,
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipesService: RecipesService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipesService.findOne(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.loading = false;
    });
  }

  get imageUrl(): string | null {
    return resolveImageUrl(this.recipe?.imageUrl);
  }

  get ingredientsList(): string[] {
    return (
      this.recipe?.ingredients
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean) ?? []
    );
  }

  get instructionsSteps(): string[] {
    return (
      this.recipe?.instructions
        .split(/\r?\n|(?<=\.)\s+(?=[A-ZÀ-Ú])/)
        .map((item) => item.trim())
        .filter(Boolean) ?? []
    );
  }
}
