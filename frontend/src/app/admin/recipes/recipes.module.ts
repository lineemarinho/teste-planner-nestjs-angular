import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RouterModule, RecipesRoutingModule],
})
export class RecipesModule {}
