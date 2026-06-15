import { Injectable, signal  } from '@angular/core';

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info', delay: number = 2000) {
    const toast: Toast = {
      message,
      type,
      delay
    };

    console.log('adding this toast', toast);
    this.toasts.update(current => [...current, toast]);
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
    this.toasts.update(current => current.filter(t => t !== toast));
  }

  clear() {
    this.toasts.set([]);
  }
}
