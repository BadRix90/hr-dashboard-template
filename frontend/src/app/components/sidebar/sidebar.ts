import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TextService } from '../../services/text';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  open = input(false);
  navItems: NavItem[];

  constructor(textService: TextService) {
    this.navItems = [
      { label: textService.nav.dashboard, route: '/dashboard', icon: 'dashboard' },
      { label: textService.nav.vacation, route: '/vacation', icon: 'calendar_today' },
      { label: textService.nav.timeTracking, route: '/time-tracking', icon: 'schedule' },
      { label: textService.nav.team, route: '/team', icon: 'people' },
      { label: textService.nav.settings, route: '/settings', icon: 'settings' }
    ];
  }
}
