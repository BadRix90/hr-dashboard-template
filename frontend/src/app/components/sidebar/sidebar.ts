import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Vacation', route: '/vacation', icon: 'calendar_today' },
    { label: 'Time Tracking', route: '/time-tracking', icon: 'schedule' },
    { label: 'Team', route: '/team', icon: 'people' },
    { label: 'Settings', route: '/settings', icon: 'settings' }
  ];
}
