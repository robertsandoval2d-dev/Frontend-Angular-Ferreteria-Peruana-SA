import { Component } from '@angular/core';
import { FormRegistroUsuario } from './../../components/form-registro-usuario/form-registro-usuario';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [FormRegistroUsuario, TablaUsuarios],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.scss',
})
export class GestionUsuarios {}
