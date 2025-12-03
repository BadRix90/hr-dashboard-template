import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  avatar: string;
}

interface Notifications {
  email: boolean;
  vacation: boolean;
  timeTracking: boolean;
  team: boolean;
}

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  activeTab = 'profile';
  theme = 'light';

  tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'account', label: 'Account', icon: 'security' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' }
  ];

  user: User = {
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@company.com',
    phone: '+49 123 456789',
    department: 'Engineering',
    role: 'Senior Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max'
  };

  notifications: Notifications = {
    email: true,
    vacation: true,
    timeTracking: false,
    team: true
  };

  changeAvatar() {
    console.log('Change avatar');
  }

  saveProfile() {
    console.log('Save profile', this.user);
  }

  cancelChanges() {
    console.log('Cancel changes');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Delete account');
    }
  }

  saveNotifications() {
    console.log('Save notifications', this.notifications);
  }

  saveAppearance() {
    console.log('Save appearance', this.theme);
  }
}
