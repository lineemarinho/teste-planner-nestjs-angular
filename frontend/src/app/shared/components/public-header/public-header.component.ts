import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  standalone: false,
  styleUrl: './public-header.component.scss',
})
export class PublicHeaderComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/recipes']);
  }
}
