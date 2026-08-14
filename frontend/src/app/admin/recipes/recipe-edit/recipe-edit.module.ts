import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutofocusModule } from '../../../shared/directives/autofocus';
import { RecipeEditComponent } from './recipe-edit.component';

const routes: Routes = [{ path: '', component: RecipeEditComponent }];

@NgModule({
  declarations: [RecipeEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AutofocusModule,
    RouterModule.forChild(routes),
  ],
})
export class RecipeEditModule {}
