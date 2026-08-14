import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DifficultyBadgeModule } from '../shared/components/difficulty-badge';
import { PublicHeaderModule } from '../shared/components/public-header';
import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    DifficultyBadgeModule,
    PublicHeaderModule,
    RecipeDetailRoutingModule,
  ],
})
export class RecipeDetailModule {}
