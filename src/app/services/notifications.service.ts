import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showMessage(label = '', message: string): void {
    this.snackBar.open(message, label, {
      duration: 1500
    });
  }
}
