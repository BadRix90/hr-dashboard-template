import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import * as LucideIcons from 'lucide-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideIcons.LucideAngularModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  toasts$: Observable<any[]>;

  icons = {
    checkCircle: LucideIcons.CheckCircle,
    xCircle: LucideIcons.XCircle,
    info: LucideIcons.Info,
    alertTriangle: LucideIcons.AlertTriangle,
    x: LucideIcons.X
  };

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(id: number): void {
    this.toastService.remove(id);
  }
}