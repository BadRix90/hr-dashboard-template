import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Vacation } from './pages/vacation/vacation';
import { TimeTracking } from './pages/time-tracking/time-tracking';
import { Team } from './pages/team/team';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'vacation', component: Vacation },
  { path: 'time-tracking', component: TimeTracking },
  { path: 'team', component: Team },
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: '/dashboard' }
];
