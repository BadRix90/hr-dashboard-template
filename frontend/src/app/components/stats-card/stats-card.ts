import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  title = input.required<string>();
  value = input.required<string>();
  icon = input.required<string>();
  route = input.required<string>();
  color = input<string>('primary');
}
