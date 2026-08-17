import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PublicFooterModule } from '../shared/components/public-footer';
import { PublicHeaderModule } from '../shared/components/public-header';
import { RecipeCardModule } from '../shared/components/recipe-card';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    PublicFooterModule,
    PublicHeaderModule,
    RecipeCardModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
