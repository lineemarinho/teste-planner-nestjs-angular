import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: false,
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
