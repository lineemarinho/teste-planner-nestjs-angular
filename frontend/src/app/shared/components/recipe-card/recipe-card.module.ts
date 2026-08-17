import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DifficultyBadgeModule } from '../difficulty-badge';
import { TruncateModule } from '../../pipes/truncate';
import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
  declarations: [RecipeCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    DifficultyBadgeModule,
    TruncateModule,
  ],
  exports: [RecipeCardComponent],
})
export class RecipeCardModule {}
