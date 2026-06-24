import { Component } from '@angular/core';
import { FormRegistroPenalidad } from '../../components/form-registro-penalidad/form-registro-penalidad';
import { TablaOrdenesCompraPenalidad } from '../../components/tabla-ordenes-compra-penalidad/tabla-ordenes-compra-penalidad';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-penalidades',
  imports: [FormRegistroPenalidad, TablaOrdenesCompraPenalidad, AsyncPipe],
  templateUrl: './penalidades.html',
  standalone: true,
  styleUrl: './penalidades.scss',
})
export class Penalidades {

  mostrarFormulario: boolean = false;
  ordenSeleccionada: any = null;


  cerrarFormulario(){
    this.mostrarFormulario = false;
  }

  abrirFormulario(ordenVencida: any){
    this.mostrarFormulario = true;
    this.ordenSeleccionada = ordenVencida;
  }

}
