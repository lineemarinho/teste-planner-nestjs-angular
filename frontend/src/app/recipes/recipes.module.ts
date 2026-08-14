import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DifficultyBadgeModule } from '../shared/components/difficulty-badge';
import { PublicHeaderModule } from '../shared/components/public-header';
import { TruncateModule } from '../shared/pipes/truncate';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DifficultyBadgeModule,
    PublicHeaderModule,
    TruncateModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
