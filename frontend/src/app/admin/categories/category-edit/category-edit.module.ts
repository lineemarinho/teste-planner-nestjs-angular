import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutofocusModule } from '../../../shared/directives/autofocus';
import { CategoryEditComponent } from './category-edit.component';

const routes: Routes = [{ path: '', component: CategoryEditComponent }];

@NgModule({
  declarations: [CategoryEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AutofocusModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryEditModule {}
