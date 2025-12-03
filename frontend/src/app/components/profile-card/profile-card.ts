import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TextService } from '../../services/text';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-profile-card',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  isOpen = false;
  text: TextService;

  user: User = {
    name: 'Max Mustermann',
    email: 'max.mustermann@company.com',
    role: 'Senior Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max'
  };

  constructor(textService: TextService) {
    this.text = textService;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  logout() {
    console.log('Logout');
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-trigger') && !target.closest('.profile-dropdown')) {
      this.closeDropdown();
    }
  }
}
