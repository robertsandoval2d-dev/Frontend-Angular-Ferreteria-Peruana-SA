import { Component } from '@angular/core';
import { FormRegistroPenalidad } from '../../components/form-registro-penalidad/form-registro-penalidad';
import { TablaOrdenesCompraPenalidad } from '../../components/tabla-ordenes-compra-penalidad/tabla-ordenes-compra-penalidad';

@Component({
  selector: 'app-penalidades',
  imports: [FormRegistroPenalidad, TablaOrdenesCompraPenalidad],
  templateUrl: './penalidades.html',
  styleUrl: './penalidades.scss',
})
export class Penalidades {}
