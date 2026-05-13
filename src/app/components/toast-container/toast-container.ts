import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast-container',
  imports: [NgbToastModule,CommonModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer{
  toastService = inject(ToastService);

  getToastClass(type: ToastType): string {
    const baseClass = 'text-light';
    switch (type) {
      case 'success': return `bg-success ${baseClass}`;
      case 'danger': return `bg-danger ${baseClass}`;
      case 'warning': return `bg-warning ${baseClass}`;
      case 'info': return `bg-info ${baseClass}`;
      default: return baseClass;
    }
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'images/check.png';
      case 'danger':
        return 'images/equis.png';
      case 'warning':
        return 'images/advertencia.png';
      case 'info':
        return 'images/info.png';
      default:
        return 'images/info.png';
    }
  }
}
