import { Component } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  standalone: false,
  styleUrl: './public-footer.component.scss',
})
export class PublicFooterComponent {
  readonly currentYear = new Date().getFullYear();
}
