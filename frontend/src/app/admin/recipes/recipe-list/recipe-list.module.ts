import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DifficultyBadgeModule } from '../../../shared/components/difficulty-badge';
import { RecipeListComponent } from './recipe-list.component';

const routes: Routes = [{ path: '', component: RecipeListComponent }];

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    DifficultyBadgeModule,
    RouterModule.forChild(routes),
  ],
})
export class RecipeListModule {}
