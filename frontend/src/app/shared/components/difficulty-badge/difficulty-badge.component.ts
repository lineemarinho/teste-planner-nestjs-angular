import { Component, Input } from '@angular/core';
import { DIFFICULTY_LABELS } from '../../constants';
import { RecipeDifficulty } from '../../models';

@Component({
  selector: 'app-difficulty-badge',
  templateUrl: './difficulty-badge.component.html',
  standalone: false,
  styleUrl: './difficulty-badge.component.scss',
})
export class DifficultyBadgeComponent {
  @Input({ required: true }) difficulty!: RecipeDifficulty;

  get label(): string {
    return DIFFICULTY_LABELS[this.difficulty];
  }
}
