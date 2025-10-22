import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import * as LucideIcons from "lucide-angular"
import { SidebarComponent } from "./components/sidebar/sidebar"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    LucideIcons.LucideAngularModule,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class AppComponent {
  title = "HR Dashboard"

  burgerIcons = {
    menu: LucideIcons.Menu,
    x: LucideIcons.X,
  }
}

export { AppComponent as App }