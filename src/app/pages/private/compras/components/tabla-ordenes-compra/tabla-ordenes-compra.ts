import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable, map, timer } from 'rxjs';
import { CompraService } from '../../services/compra.service';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { OrdenCompraListResponse } from '../../models/response/orden-compra-list-response';
import { ActualizacionInventarioRequest } from '../../../inventario/models/request/actualizacion-inventario-request';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-tabla-ordenes-compra',
  imports: [ReactiveFormsModule],
  templateUrl: './tabla-ordenes-compra.html',
  styleUrl: './tabla-ordenes-compra.scss',
})
export class TablaOrdenesCompra implements OnInit{
  private compraService = inject(CompraService);
  private inventarioService = inject(InventarioService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  buscadorControl = new FormControl('');

  textoActualizacion$!: Observable<string>;

  listaOrdenesCompra: OrdenCompraListResponse[]=[];
  // listaOrdenesCompra = [
  //   { 
  //     ordenCompraId: 1, 
  //     nombreProveedor: 'Proveedor A',
  //     fechaEntrega: '2026-05-10',
  //     plazoFechaMaximo: '2026-05-10T23:59:59',
  //     productos: [
  //       { productoId: 1, nombreProducto: 'Prod A', nombreLinea:'Linea A', cantidad: 10},
  //       { productoId: 3, nombreProducto: 'Prod B', nombreLinea:'Linea A', cantidad: 10},
  //       { productoId: 4, nombreProducto: 'Prod C', nombreLinea:'Linea B', cantidad: 10}
  //     ]
  //   },
  //   { 
  //     ordenCompraId: 2, 
  //     nombreProveedor: 'Proveedor B',
  //     fechaEntrega: '2026-05-12',
  //     plazoFechaMaximo: '2026-05-13T23:59:59',
  //     productos: [
  //       { productoId: 2, nombreProducto: 'Prod D', nombreLinea:'Linea A', cantidad: 5 },
  //       { productoId: 5, nombreProducto: 'Prod E', nombreLinea:'Linea B', cantidad: 5 }
  //     ]
  //   }
  // ];

  ordenEncontrada: any=null;
  terminoBuscado: string = '';

  formularioInventario = new FormGroup({
    ordenCompraId: new FormControl<number | null>(null),
    productos: new FormArray([])
  });

  get productosFormArray() {
    return this.formularioInventario.get('productos') as FormArray;
  }

  ngOnInit(){
    this.cargarListaOrdenesCompra();

    const tiempoCarga = new Date();
    this.textoActualizacion$ = timer(0,60000).pipe(
      map(() => {
        const ahora = new Date();
        const minutos = Math.floor((ahora.getTime() - tiempoCarga.getTime()) / 60000);

        if (minutos < 1) {
          return 'Actualizado hace unos segundos';
        } else if (minutos === 1) {
          return 'Actualizado hace 1 min';
        } else {
          return `Actualizado hace ${minutos} min`;
        }
      })
    );

  }

  cargarListaOrdenesCompra(){
    this.compraService.listarOrdenesCompra().subscribe({
      next: (respuestaBackend) => {
        this.listaOrdenesCompra=respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista órdenes compra cargado correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend);
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  ejecutarBusqueda() {
    // Obtenemos el valor actual del input (o un string vacío si es null)
    const valor = this.buscadorControl.value || '';
    this.terminoBuscado = valor.trim();
    this.ordenEncontrada = null;
    this.cdr.detectChanges();

    this.productosFormArray.clear();
    this.formularioInventario.get('ordenCompraId')?.setValue(null);

    // Si el usuario le dio clic pero el input está vacío
    if (!this.terminoBuscado) {
      this.ordenEncontrada = null;
      return;
    }

    // Filtramos usando el valor capturado
    this.ordenEncontrada = this.listaOrdenesCompra.find(orden => 
      orden.ordenCompraId.toString() === this.terminoBuscado
    );

    if(this.ordenEncontrada){
      this.formularioInventario.get('ordenCompraId')?.setValue(this.ordenEncontrada.ordenCompraId);

      this.ordenEncontrada.productos.forEach((producto:any)  => {
        this.productosFormArray.push(new FormGroup({
          productoId: new FormControl(producto.productoId),
          nombreProducto: new FormControl(producto.nombreProducto),
          cantidaRegistrada: new FormControl(''),
          cantidad: new FormControl(producto.cantidad),
          nombreLinea: new FormControl(producto.nombreLinea)
        }));
      });
      this.cdr.detectChanges();
    }
  }

  actualizarInventario() {
    if(this.formularioInventario.invalid){
      this.toastService.error('Formulario invalido');
      return;
    }

    const productosCrudos = this.formularioInventario.value.productos || [];

    const payload: ActualizacionInventarioRequest = {
      ordenCompraId: this.ordenEncontrada.ordenCompraId,
      productos: productosCrudos.map((productoForm: any) => {
        return{
          productoId: productoForm.productoId,
          cantidad: productoForm.cantidad
        };
      })
    };

    console.log('Datos listos para el backend:', payload);
    
    this.inventarioService.actualizarInventario(payload).subscribe({
      next: (respuestaBackend) => {
        console.log(respuestaBackend);
        this.ordenEncontrada=null;
        this.cargarListaOrdenesCompra();

        setTimeout(() => {
          this.toastService.success('Mercadería recepcionada correctamente');
        },300);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        setTimeout(() => {
          this.toastService.error(mensaje);
        },300);
      }
    })
  }
}
