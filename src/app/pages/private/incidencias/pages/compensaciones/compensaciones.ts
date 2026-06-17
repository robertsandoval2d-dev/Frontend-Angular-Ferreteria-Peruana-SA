import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TablaPedidosCompensacion } from "../../components/tabla-pedidos-compensacion/tabla-pedidos-compensacion";
import { FormRegistroCompensacion } from "../../components/form-registro-compensacion/form-registro-compensacion";

@Component({
  selector: 'app-compensaciones',
  imports: [TablaPedidosCompensacion,FormRegistroCompensacion, AsyncPipe],
  templateUrl: './compensaciones.html',
  styleUrl: './compensaciones.scss',
})
export class Compensaciones {
  mostrarFormulario: boolean = false;
  pedidoSeleccionado: any = null;

  cerrarFormulario(){
    this.mostrarFormulario = false;
  }

  abrirFormulario(pedidoVencido: any){
    this.mostrarFormulario = true;
    this.pedidoSeleccionado = pedidoVencido;
  }

}
