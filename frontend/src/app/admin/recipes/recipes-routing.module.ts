import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./recipe-list/recipe-list.module').then(
            (m) => m.RecipeListModule,
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./recipe-edit/recipe-edit.module').then(
            (m) => m.RecipeEditModule,
          ),
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('./recipe-edit/recipe-edit.module').then(
            (m) => m.RecipeEditModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
