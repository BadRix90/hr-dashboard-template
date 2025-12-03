import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme';

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
export class Settings implements OnInit {
  activeTab = 'profile';
  theme = 'light';
  selectedFont = 'plus-jakarta';

  constructor(private themeService: ThemeService) {}

  tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'account', label: 'Account', icon: 'security' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' }
  ];

  fonts = [
    {
      id: 'plus-jakarta',
      name: 'Plus Jakarta Sans',
      family: "'Plus Jakarta Sans', sans-serif"
    },
    {
      id: 'work-sans',
      name: 'Work Sans',
      family: "'Work Sans', sans-serif"
    },
    {
      id: 'nunito',
      name: 'Nunito',
      family: "'Nunito', sans-serif"
    },
    {
      id: 'quicksand',
      name: 'Quicksand',
      family: "'Quicksand', sans-serif"
    },
    {
      id: 'balthazar',
      name: 'Balthazar',
      family: "'Balthazar', serif"
    }
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

  ngOnInit() {
    this.selectedFont = this.themeService.getCurrentFont();
  }

  selectFont(fontId: string) {
    this.selectedFont = fontId;
    this.themeService.setFont(fontId);
  }

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
    console.log('Appearance saved', { theme: this.theme, font: this.selectedFont });
  }
}
