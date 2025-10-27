import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import * as LucideIcons from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideIcons.LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = false;
  currentUser: any = null;

  icons = {
    home: LucideIcons.Home,
    clock: LucideIcons.Clock,
    calendar: LucideIcons.Calendar,
    users: LucideIcons.Users,
    barChart: LucideIcons.BarChart3,
    logOut: LucideIcons.LogOut,
    user: LucideIcons.User,
    x: LucideIcons.X
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.unlockBodyScroll();
  }

  get menuItems() {
    const allItems = [
      { 
        path: '/dashboard', 
        label: 'Dashboard', 
        icon: this.icons.home, 
        roles: ['admin', 'manager', 'employee'] 
      },
      { 
        path: '/time-tracking', 
        label: 'Zeiterfassung', 
        icon: this.icons.clock, 
        roles: ['admin', 'manager', 'employee'] 
      },
      { 
        path: '/vacation', 
        label: 'Urlaub', 
        icon: this.icons.calendar, 
        roles: ['admin', 'manager', 'employee'] 
      },
      { 
        path: '/manager', 
        label: 'Manager', 
        icon: this.icons.barChart, 
        roles: ['admin', 'manager'] 
      },
      { 
        path: '/users', 
        label: 'Mitarbeiter', 
        icon: this.icons.users, 
        roles: ['admin'] 
      }
    ];

    const userRole = this.authService.currentRole();
    return allItems.filter(item => !userRole || item.roles.includes(userRole));
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.lockBodyScroll();
    } else {
      this.unlockBodyScroll();
    }
  }

  closeSidebar(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.unlockBodyScroll();
    }
  }

  lockBodyScroll(): void {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
  }

  unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeSidebar();
  }

  logout(): void {
    this.authService.logout();
  }
}