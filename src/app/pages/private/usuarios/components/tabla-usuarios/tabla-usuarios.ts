import Swal from 'sweetalert2';
import { Component, inject, OnInit, ChangeDetectorRef, EventEmitter, Output, DestroyRef } from '@angular/core';
import { ToastService } from '../../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserService } from '../../services/user.service';
import { TrabajadorListResponse } from '../../models/response/trabajador-list-response';
import { TrabajadorUpdateRequest } from '../../models/request/trabajador-update-request';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [],
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.scss',
})
export class TablaUsuarios implements OnInit{

  private usuariosService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  listaTrabajadores: TrabajadorListResponse[] = [];
  listaFiltrada: TrabajadorListResponse[] = [];
  filtroActual: string = 'rol';
  
  ngOnInit() {
    this.cargarTrabajadores();
    this.usuariosService.refresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cargarTrabajadores();
    });
  }
  
  cargarTrabajadores(){
    this.usuariosService.listarTrabajadores().subscribe({
      next: (respuestaBackend) => {
        this.listaTrabajadores = respuestaBackend;
        this.listaFiltrada = respuestaBackend;
        this.cdr.detectChanges();
      },
      error: (errorBackend) => {
        console.error('Error del Backend, revisar consola!!', errorBackend)
      }

    });
  }

  cambiarFiltro(filtro: string){
    this.filtroActual = filtro;
    switch(filtro){
      case 'Rol':
        this.listaFiltrada = [...this.listaFiltrada].sort((a, b) => a.rol.localeCompare(b.rol));
        break;
      case 'Id':
        this.listaFiltrada = [...this.listaFiltrada].sort((a,b)=> a.trabajadorId - b.trabajadorId);
        break;
      case 'Nombre':
        this.listaFiltrada = [...this.listaFiltrada].sort((a,b)=> a.nombre.localeCompare(b.nombre));
        break;
      case 'Estado':
        this.listaFiltrada = [...this.listaFiltrada].sort((a,b)=> (b.cuentaActiva ? 1 : 0) - (a.cuentaActiva ? 1 : 0));
        break;
    }
    this.cdr.detectChanges();
  }

  confirmarBaja(trabajador: TrabajadorListResponse) {
    Swal.fire({
      title: '¿Dar de baja?',
      text: `¿Estás seguro de que deseas deshabilitar a ${trabajador.nombre}? Esta acción restringirá su acceso al sistema.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f16359',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.usuariosService.deshabilitarTrabajador(trabajador.trabajadorId).subscribe({
          next: () => {
            this.usuariosService.notifyRefresh();
            this.toastService.success(
              `El trabajador ${trabajador.nombre} ha sido dado de baja exitosamente.`,
              4000
            );
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error al dar de baja:', err);
            this.toastService.error('Ocurrió un error al intentar comunicar con el servidor.', 4000);
          }
        });
      }
  });
}

  @Output() onRegistrarClick = new EventEmitter<void>();
  @Output() onModificarClick = new EventEmitter<any>();

  abrirRegistro(){
    this.onRegistrarClick.emit();
  }

  modificarTrabajador(trabajador: TrabajadorUpdateRequest){
    this.onModificarClick.emit(trabajador);
  }

  //MockPrueba
  trabajadorDePrueba = {
    trabajadorId: 11111,
    nombre: 'Robert Alonso Sandoval',
    dni: '123456789',
    cuentaActiva: true,
    tiendaId: 1,
    lineaId: 2,
    rol: 'ADMINISTRADOR_DE_TIENDA',
    username: 'rsandoval'
  };


}
