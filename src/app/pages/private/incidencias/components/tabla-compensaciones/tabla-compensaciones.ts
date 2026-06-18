import { Component, Output, EventEmitter, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

import { IncidenciasService } from '../../services/incidencias.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { CompensacionResponse } from '../../models/response/compensacion-response';

@Component({
  selector: 'app-tabla-compensaciones',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './tabla-compensaciones.html',
  styleUrl: './tabla-compensaciones.scss',
})
export class TablaCompensaciones implements OnInit{
  private incidenciasService = inject(IncidenciasService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  listaCompensaciones: CompensacionResponse[] = [];

  ngOnInit() {
    this.listarCompensacionesPendientes();
  }

  listarCompensacionesPendientes(){
    this.incidenciasService.listarCompensacionesPendientes().subscribe({
      next:(respuestaBackend) => {
        this.listaCompensaciones = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista de compensaciones cargada correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });
  }

  aprobarCompensacion(id: number){
    this.incidenciasService.aprobarCompensacion(id).subscribe({
      next:(respuestaBackend) => {
        console.log('Compensación actualizada correctamente',respuestaBackend);  
        this.toastService.success('Compensación aprobada');

        const index = this.listaCompensaciones.findIndex(c => c.compensacionId === id);
        
        if (index !== -1) {
          this.listaCompensaciones[index] = respuestaBackend;
          this.cdr.detectChanges();
        }
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });
  }

  rechazarCompensacion(id: number){
    this.incidenciasService.rechazarCompensacion(id).subscribe({
      next:(respuestaBackend) => {
        console.log('Compensación actualizada correctamente',respuestaBackend);  
        this.toastService.success('Compensación rechazada'); 

        const index = this.listaCompensaciones.findIndex(c => c.compensacionId === id);
        
        if (index !== -1) {
          this.listaCompensaciones[index] = respuestaBackend;
          this.cdr.detectChanges();
        }
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });
  }

}
