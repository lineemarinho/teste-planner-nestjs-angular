import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PublicHeaderComponent } from './public-header.component';

@NgModule({
  declarations: [PublicHeaderComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [PublicHeaderComponent],
})
export class PublicHeaderModule {}
