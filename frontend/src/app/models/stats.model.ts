export interface DashboardStats {
  today_hours: number;
  week_hours: number;
  month_hours: number;
  active_projects: number;
}

export interface TeamStats {
  total_employees: number;
  present_today: number;
  on_vacation: number;
  pending_requests: number;
}

export interface OvertimeStats {
  employee_id: number;
  employee_name: string;
  total_overtime: number;
  current_month: number;
}