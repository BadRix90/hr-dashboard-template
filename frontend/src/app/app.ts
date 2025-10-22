import { Component } from "@angular/core"
import * as LucideIcons from "lucide-angular"
import { SidebarComponent } from "./components/sidebar/sidebar"
import { StatsCardsComponent } from "./components/stats-cards/stats-cards"
import { TimerComponent } from "./components/timer/timer"
import { TimeEntryFormComponent } from "./components/time-entry-form/time-entry-form"
import { TimeEntryListComponent } from "./components/time-entry-list/time-entry-list"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    SidebarComponent,
    StatsCardsComponent,
    TimerComponent,
    TimeEntryFormComponent,
    TimeEntryListComponent,
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
