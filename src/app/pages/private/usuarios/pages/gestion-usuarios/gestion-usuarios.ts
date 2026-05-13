import { Component } from '@angular/core';
import { FormRegistroUsuario } from './../../components/form-registro-usuario/form-registro-usuario';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [FormRegistroUsuario],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.scss',
})
export class GestionUsuarios {}
