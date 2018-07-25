import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public snackBar: MatSnackBar) { }

  public showToast(message: string, action?: string, duration: number = 2000): void {

    this.snackBar.open(message, action, {
      duration: duration,
    });

  }
}
