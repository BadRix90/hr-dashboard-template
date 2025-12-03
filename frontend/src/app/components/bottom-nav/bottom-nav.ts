import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Vacation', route: '/vacation', icon: 'calendar_today' },
    { label: 'Time', route: '/time-tracking', icon: 'schedule' },
    { label: 'Team', route: '/team', icon: 'people' }
  ];
}
