import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000) {
    this.show(message, duration, 'toast-success');
  }

  error(message: string, duration: number = 4000) {
    this.show(message, duration, 'toast-error');
  }

  info(message: string, duration: number = 3000) {
    this.show(message, duration, 'toast-info');
  }

  warning(message: string, duration: number = 3000) {
    this.show(message, duration, 'toast-warning');
  }

  private show(message: string, duration: number, panelClass: string) {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    };

    this.snackBar.open(message, 'X', config);
  }
}
