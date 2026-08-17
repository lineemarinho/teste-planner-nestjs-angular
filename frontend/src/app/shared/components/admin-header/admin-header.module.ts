import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header.component';

@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [AdminHeaderComponent],
})
export class AdminHeaderModule {}
