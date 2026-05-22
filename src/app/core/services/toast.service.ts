import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  className: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  toasts: Toast[] = [];

  show(message: string, type: ToastType = 'info', delay: number = 2000) {

    const classMap = {
      success: 'bg-success text-light',
      danger: 'bg-danger text-light',
      warning: 'bg-warning text-light',
      info: 'bg-info text-light'
    };

    const toast: Toast = {
      message,
      type,
      className: classMap[type],
      delay
    };

    console.log('adding this toast', toast);
    this.toasts.push(toast);
  }

  success(message: string, delay?: number) {
    this.show(message, 'success', delay ?? 2000);
  }

  error(message: string, delay?: number) {
    this.show(message, 'danger', delay ?? 2000);
  }

  info(message: string, delay?: number) {
    this.show(message, 'info', delay ?? 2000);
  }

  warning(message: string, delay?: number) {
    this.show(message, 'warning', delay ?? 2000);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
  }
}
