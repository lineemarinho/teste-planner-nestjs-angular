import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./category-list/category-list.module').then(
            (m) => m.CategoryListModule,
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./category-edit/category-edit.module').then(
            (m) => m.CategoryEditModule,
          ),
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('./category-edit/category-edit.module').then(
            (m) => m.CategoryEditModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
