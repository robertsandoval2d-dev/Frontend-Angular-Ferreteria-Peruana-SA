import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TablaCronogramas } from "../../components/tabla-cronogramas/tabla-cronogramas";
import { FormGenerarOrdenCompra } from "../../components/form-generar-orden-compra/form-generar-orden-compra";

@Component({
  selector: 'app-gestion-compras',
  imports: [TablaCronogramas, AsyncPipe, FormGenerarOrdenCompra],
  templateUrl: './gestion-compras.html',
  styleUrl: './gestion-compras.scss',
})
export class GestionCompras {}
