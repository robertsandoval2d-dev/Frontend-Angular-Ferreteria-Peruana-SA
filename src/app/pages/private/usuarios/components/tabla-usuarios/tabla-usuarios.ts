import { Component, inject, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TrabajadorListResponse } from '../../models/response/trabajador-list-response';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [],
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.scss',
})
export class TablaUsuarios implements OnInit{

  private usuariosService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  listaTrabajadores: TrabajadorListResponse[] = [];
  
  ngOnInit() {
    // 1. Cargamos la lista por primera vez
    this.cargarTrabajadores();

    // 2. ¡NOS QUEDAMOS ESCUCHANDO LA RADIO!
    this.usuariosService.refresh$.subscribe(() => {
      console.log('La radio avisó: ¡A recargar la tabla!');
      this.cargarTrabajadores(); // Ejecutamos TU método de siempre
    });
  }
  
  cargarTrabajadores(){
    this.usuariosService.listarTrabajadores().subscribe({
      next: (respuestaBackend) => {
        this.listaTrabajadores = respuestaBackend;
        
        this.cdr.detectChanges();
      console.log('Datos cargados correctamente')

      },
      error: (errorBackend) => {
        console.error('Error del Backend, revisar consola!!')
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
    rol: 'ADMIN_TIENDA', // Por si quieres probar tus @if
    username: 'rsandoval'
  };




}
