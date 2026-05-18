import Swal from 'sweetalert2';
import { Component, inject, OnInit, ChangeDetectorRef, EventEmitter, Output, DestroyRef, NgZone, ApplicationRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TrabajadorListResponse } from '../../models/response/trabajador-list-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private ngZone = inject(NgZone);
  private appRef = inject(ApplicationRef);

  listaTrabajadores: TrabajadorListResponse[] = [];
  
  ngOnInit() {
    // 1. Cargamos la lista por primera vez
    this.cargarTrabajadores();
    // 2. ¡NOS QUEDAMOS ESCUCHANDO LA RADIO!
    this.usuariosService.refresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      console.log('La radio avisó: ¡A recargar la tabla!');
      this.cargarTrabajadores(); // Ejecutamos TU método de siempre
    });
  }
  
  cargarTrabajadores(){
    this.usuariosService.listarTrabajadores().subscribe({
      next: (respuestaBackend) => {
        this.listaTrabajadores = respuestaBackend;
        console.log('trabajadores llegaron:', this.listaTrabajadores)

        this.cdr.detectChanges();
      console.log('Datos cargados correctamente')

      },
      error: (errorBackend) => {
        console.error('Error del Backend, revisar consola!!', errorBackend)
      }

    });
  }

  confirmarBaja(trabajador: any) {
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
        
        // 🔥 MAGIA PURA: Volvemos a meter el hilo a Angular ANTES de hacer la petición
        this.ngZone.run(() => {
          
          this.usuariosService.deshabilitarTrabajador(trabajador.trabajadorId).subscribe({
            next: () => { 
              // 1. Refrescamos la tabla
              this.usuariosService.notifyRefresh(); 
              
              // 2. Disparamos el Toast limpiamente (Usa los backticks ` para el nombre)
              this.toastService.success(`El trabajador ${trabajador.nombre} ha sido dado de baja exitosamente.`, 3000);
            },
            error: (err) => {
              console.error('Error al dar de baja:', err);
              this.toastService.error('Ocurrió un error al intentar comunicar con el servidor.', 4000);
            }
          });

        }); // 🔥 Fin de NgZone

      }
    });
  }



  @Output() onRegistrarClick = new EventEmitter<void>();
  @Output() onModificarClick = new EventEmitter<any>();

  abrirRegistro(){
    this.onRegistrarClick.emit();
  }

  modificarTrabajador(trabajador: any){
    this.onModificarClick.emit(trabajador);
  }

  //MockPrueba
  trabajadorDePrueba = {
    trabajadorId: 11111,
    nombre: 'Robert Alonso Sandoval',
    dni: '123456789',
    tiendaId: 1,
    lineaId: 2,
    rol: 'ADMINISTRADOR_DE_TIENDA',
    username: 'rsandoval'
  };




}
