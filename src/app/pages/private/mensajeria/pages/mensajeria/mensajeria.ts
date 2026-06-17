import { Component } from '@angular/core';

import { FormMensaje } from '../../components/form-mensaje/form-mensaje';
import { TablaMensajes } from '../../components/tabla-mensajes/tabla-mensajes';
import { ViewMensaje } from '../../components/view-mensaje/view-mensaje';

@Component({
  selector: 'app-mensajeria',
  imports: [FormMensaje, TablaMensajes, ViewMensaje],
  templateUrl: './mensajeria.html',
  styleUrl: './mensajeria.scss',
})
export class Mensajeria {}
