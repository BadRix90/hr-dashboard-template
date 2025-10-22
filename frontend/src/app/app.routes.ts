import type { Routes } from "@angular/router"
import { DashboardComponent } from "./pages/dashboard/dashboard"
import { TimeTrackingComponent } from "./pages/time-tracking/time-tracking"
import { VacationComponent } from "./pages/vacation/vacation"
import { UserManagementComponent } from "./pages/user-management/user-management"
import { ManagerDashboardComponent } from "./pages/manager-dashboard/manager-dashboard"

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "time-tracking", component: TimeTrackingComponent },
  { path: "vacation", component: VacationComponent },
  { path: "users", component: UserManagementComponent },
  { path: "manager", component: ManagerDashboardComponent },
]