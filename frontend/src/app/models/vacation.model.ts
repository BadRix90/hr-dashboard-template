export interface VacationRequest {
  id: number;
  employee: number;
  employee_name: string;
  start_date: string;
  end_date: string;
  type: 'urlaub' | 'krank' | 'sonderurlaub';
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
}

export interface VacationBalance {
  employee_id: number;
  total_days: number;
  used_days: number;
  remaining_days: number;
  pending_days: number;
}