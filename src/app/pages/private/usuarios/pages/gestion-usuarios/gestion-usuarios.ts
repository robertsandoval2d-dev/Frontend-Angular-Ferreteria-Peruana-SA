import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormRegistroUsuario } from './../../components/form-registro-usuario/form-registro-usuario';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { FormUpdateUsuario } from '../../components/form-update-usuario/form-update-usuario';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [FormRegistroUsuario, TablaUsuarios, FormUpdateUsuario, AsyncPipe],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.scss',
})
export class GestionUsuarios {
  
  mostrarFormulario: boolean = false;
  
  abrirFormulario() {
    this.mostrarFormulario = true;
  }
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  mostrarFormUpdate: boolean = false;
  trabajadorSeleccionado: any = null;

  abrirFormUpdate(trabajador: any) {
    this.trabajadorSeleccionado = trabajador;
    this.mostrarFormUpdate = true;
  }

  cerrarFormUpdate(){
    this.mostrarFormUpdate = false;
  }
}
