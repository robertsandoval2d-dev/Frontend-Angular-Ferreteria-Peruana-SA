import { Component } from '@angular/core';
import { TablaCompensaciones } from "../../components/tabla-compensaciones/tabla-compensaciones";

@Component({
  selector: 'app-compensaciones-aprobacion',
  imports: [TablaCompensaciones],
  templateUrl: './compensaciones-aprobacion.html',
  styleUrl: './compensaciones-aprobacion.scss',
})
export class CompensacionesAprobacion {}
