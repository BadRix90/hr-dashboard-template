import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { BottomNav } from './components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, BottomNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
