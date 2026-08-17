import { Component, Input } from '@angular/core';
import { resolveImageUrl } from '../../constants';
import { Recipe } from '../../models';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: false,
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;

  get imageUrl(): string | null {
    return resolveImageUrl(this.recipe.imageUrl);
  }
}
