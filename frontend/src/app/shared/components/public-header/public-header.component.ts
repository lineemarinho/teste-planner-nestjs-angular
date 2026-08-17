import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  standalone: false,
  styleUrl: './public-header.component.scss',
})
export class PublicHeaderComponent {
  constructor(private readonly authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
