import { Component, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import * as LucideIcons from "lucide-angular"
import { SidebarComponent } from "./components/sidebar/sidebar"
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner"
import { ToastComponent } from "./components/toast/toast"
import { AuthService } from "./services/auth"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    LucideIcons.LucideAngularModule,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class AppComponent implements OnInit {
  title = "HR Dashboard"
  isLoggedIn = false

  burgerIcons = {
    menu: LucideIcons.Menu,
    x: LucideIcons.X,
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}

export { AppComponent as App }