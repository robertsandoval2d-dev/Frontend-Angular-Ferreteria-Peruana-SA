import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TarjetaOrdenCompra } from "../../components/tarjeta-orden-compra/tarjeta-orden-compra";

@Component({
  selector: 'app-seguimiento-ordenes',
  imports: [TarjetaOrdenCompra, AsyncPipe],
  templateUrl: './seguimiento-ordenes.html',
  styleUrl: './seguimiento-ordenes.scss',
})
export class SeguimientoOrdenes {}
