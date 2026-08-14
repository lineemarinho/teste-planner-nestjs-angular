import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicHeaderComponent } from './public-header.component';

@NgModule({
  declarations: [PublicHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [PublicHeaderComponent],
})
export class PublicHeaderModule {}
