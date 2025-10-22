import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationService, VacationBalance } from '../../services/vacation';

@Component({
  selector: 'app-vacation-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-balance.html',
  styleUrl: './vacation-balance.scss'
})
export class VacationBalanceComponent implements OnInit {
  private vacationService = inject(VacationService);
  
  balance: VacationBalance | null = null;
  loading = true;

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance(): void {
    this.loading = true;
    const employeeId = 1;
    
    this.vacationService.getVacationBalance(employeeId).subscribe({
      next: (balance) => {
        this.balance = balance;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading balance:', err);
        this.loading = false;
      }
    });
  }

  getPercentageUsed(): number {
    if (!this.balance || this.balance.total_days === 0) return 0;
    return Math.round((this.balance.used_days / this.balance.total_days) * 100);
  }
}