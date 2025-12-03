import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

interface Notification {
  id: number;
  type: 'vacation' | 'time' | 'team' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-dropdown',
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.scss',
})
export class NotificationDropdown {
  isOpen = false;

  notifications: Notification[] = [
    {
      id: 1,
      type: 'vacation',
      title: 'Vacation Request Approved',
      message: 'Your vacation request for Dec 20-27 has been approved',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'time',
      title: 'Time Entry Reminder',
      message: 'Don\'t forget to log your hours for yesterday',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'team',
      title: 'New Team Member',
      message: 'Sarah Wagner joined the Marketing team',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'The HR system will be updated tonight at 11 PM',
      time: '2 days ago',
      read: true
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  viewAllNotifications() {
    console.log('View all notifications');
    this.closeDropdown();
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      vacation: 'calendar_today',
      time: 'schedule',
      team: 'people',
      system: 'settings'
    };
    return icons[type] || 'notifications';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-trigger') && !target.closest('.notification-dropdown')) {
      this.closeDropdown();
    }
  }
}
