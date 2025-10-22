import { Routes } from '@angular/router';
import { authGuard, adminGuard, managerGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'time-tracking', 
    loadComponent: () => import('./pages/time-tracking/time-tracking').then(m => m.TimeTrackingComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'vacation', 
    loadComponent: () => import('./pages/vacation/vacation').then(m => m.VacationComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'users', 
    loadComponent: () => import('./pages/user-management/user-management').then(m => m.UserManagementComponent),
    canActivate: [authGuard, adminGuard]
  },
  { 
    path: 'manager', 
    loadComponent: () => import('./pages/manager-dashboard/manager-dashboard').then(m => m.ManagerDashboardComponent),
    canActivate: [authGuard, managerGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];