import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as LucideIcons from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideIcons.LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  isOpen = true;

  icons = {
    home: LucideIcons.Home,
    clock: LucideIcons.Clock,
    calendar: LucideIcons.Calendar,
    users: LucideIcons.Users,
    barChart: LucideIcons.BarChart3,
    x: LucideIcons.X
  };

  menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: this.icons.home },
    { path: '/time-tracking', label: 'Zeiterfassung', icon: this.icons.clock },
    { path: '/vacation', label: 'Urlaub', icon: this.icons.calendar },
    { path: '/users', label: 'Mitarbeiter', icon: this.icons.users },
    { path: '/manager', label: 'Manager', icon: this.icons.barChart }
  ];

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}