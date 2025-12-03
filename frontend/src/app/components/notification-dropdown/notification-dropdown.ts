import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { TextService } from '../../services/text';

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
  text: TextService;

  notifications: Notification[] = [
    {
      id: 1,
      type: 'vacation',
      title: 'Urlaubsantrag genehmigt',
      message: 'Dein Urlaubsantrag für 20.-27. Dez wurde genehmigt',
      time: 'vor 2 Stunden',
      read: false
    },
    {
      id: 2,
      type: 'time',
      title: 'Zeiterfassungs-Erinnerung',
      message: 'Vergiss nicht, deine Stunden von gestern zu erfassen',
      time: 'vor 5 Stunden',
      read: false
    },
    {
      id: 3,
      type: 'team',
      title: 'Neues Teammitglied',
      message: 'Sarah Wagner ist dem Marketing-Team beigetreten',
      time: 'vor 1 Tag',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'System-Update',
      message: 'Das HR-System wird heute Nacht um 23 Uhr aktualisiert',
      time: 'vor 2 Tagen',
      read: true
    }
  ];

  constructor(textService: TextService) {
    this.text = textService;
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
