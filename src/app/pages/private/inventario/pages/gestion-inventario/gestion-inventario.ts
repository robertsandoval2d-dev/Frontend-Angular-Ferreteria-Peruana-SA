import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TablaOrdenesCompra } from "../../../compras/components/tabla-ordenes-compra/tabla-ordenes-compra";

@Component({
  selector: 'app-gestion-inventario',
  imports: [TablaOrdenesCompra, AsyncPipe],
  templateUrl: './gestion-inventario.html',
  styleUrl: './gestion-inventario.scss',
})
export class GestionInventario {}
