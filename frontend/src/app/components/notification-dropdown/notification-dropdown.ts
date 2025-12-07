import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { TextService } from '../../services/text';
import { NotificationService, Notification } from '../../services/notification';

@Component({
  selector: 'app-notification-dropdown',
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.scss',
})
export class NotificationDropdown implements OnInit {
  isOpen = false;
  text: TextService;
  notifications: Notification[] = [];
  loading = true;

  constructor(
    textService: TextService,
    private notificationService: NotificationService
  ) {
    this.text = textService;
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.loading = false;
      }
    });
  }

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
    if (!notification || notification.read) return;

    this.notificationService.markAsRead(id).subscribe({
      next: (updatedNotification) => {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
          this.notifications[index] = updatedNotification;
        }
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
      },
      error: (error) => {
        console.error('Error marking all as read:', error);
      }
    });
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

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `vor ${diffMins} Min.`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `vor ${diffHours} Std.`;

    const diffDays = Math.floor(diffHours / 24);
    return `vor ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-trigger') && !target.closest('.notification-dropdown')) {
      this.closeDropdown();
    }
  }
}
