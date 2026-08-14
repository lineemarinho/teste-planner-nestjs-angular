import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicFooterComponent } from './public-footer.component';

@NgModule({
  declarations: [PublicFooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [PublicFooterComponent],
})
export class PublicFooterModule {}
