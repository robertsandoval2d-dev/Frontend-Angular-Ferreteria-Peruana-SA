import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TablaStock } from './../../../inventario/components/tabla-stock/tabla-stock';
import { FormGenerarCronograma } from './../../components/form-generar-cronograma/form-generar-cronograma';

@Component({
  selector: 'app-abastecimiento',
  imports: [TablaStock, FormGenerarCronograma, AsyncPipe],
  templateUrl: './abastecimiento.html',
  styleUrl: './abastecimiento.scss',
})
export class Abastecimiento {}
