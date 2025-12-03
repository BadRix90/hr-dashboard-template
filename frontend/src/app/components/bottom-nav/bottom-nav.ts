import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextService } from '../../services/text';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {
  navItems: NavItem[];

  constructor(textService: TextService) {
    this.navItems = [
      { label: textService.nav.dashboard, route: '/dashboard', icon: 'dashboard' },
      { label: textService.nav.vacation, route: '/vacation', icon: 'calendar_today' },
      { label: textService.nav.timeTracking, route: '/time-tracking', icon: 'schedule' },
      { label: textService.nav.team, route: '/team', icon: 'people' }
    ];
  }
}
