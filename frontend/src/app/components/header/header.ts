import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileCard } from '../profile-card/profile-card';
import { NotificationDropdown } from '../notification-dropdown/notification-dropdown';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, ProfileCard, NotificationDropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
