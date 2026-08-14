import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CategoryListComponent } from './category-list.component';

const routes: Routes = [{ path: '', component: CategoryListComponent }];

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryListModule {}
