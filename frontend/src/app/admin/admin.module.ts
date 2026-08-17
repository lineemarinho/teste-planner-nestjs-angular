import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderModule } from '../shared/components/admin-header';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule, AdminHeaderModule, AdminRoutingModule],
})
export class AdminModule {}
