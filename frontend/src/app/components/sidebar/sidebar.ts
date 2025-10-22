import { Component, HostListener, inject, type OnInit, PLATFORM_ID } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"
import * as LucideIcons from "lucide-angular"

interface NavItem {
  label: string
  icon: any
  route: string
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideIcons.LucideAngularModule],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.scss",
})
export class SidebarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID)
  isOpen = false

  icons = {
    timer: LucideIcons.Timer,
    list: LucideIcons.List,
    barChart: LucideIcons.BarChart3,
    settings: LucideIcons.Settings,
    clock: LucideIcons.Clock,
    x: LucideIcons.X,
  }

  navItems: NavItem[] = [
    { label: "Timer", icon: this.icons.timer, route: "/timer" },
    { label: "Zeiteinträge", icon: this.icons.list, route: "/entries" },
    { label: "Berichte", icon: this.icons.barChart, route: "/reports" },
    { label: "Einstellungen", icon: this.icons.settings, route: "/settings" },
  ]

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize()
    }
  }

  @HostListener("window:resize")
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize()
    }
  }

  private checkScreenSize() {
    if (window.innerWidth < 768) {
      // On mobile, always close sidebar
      this.isOpen = false
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen
  }

  closeSidebar() {
    this.isOpen = false
  }
}
