import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { ProductoStockResponse } from '../../models/response/producto-stock-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { SessionService } from '../../../../../core/auth/services/session.service';
import { ActualizacionProductoRequest } from '../../models/request/actualizacion-producto-request';

@Component({
  selector: 'app-tabla-productos',
  imports: [],
  templateUrl: './tabla-productos.html',
  styleUrl: './tabla-productos.scss',
})
export class TablaProductos implements OnInit{
  private inventarioService = inject(InventarioService);
  private toastService = inject(ToastService);
  private sessionService = inject(SessionService);
  private cdr = inject(ChangeDetectorRef);

  nombreLineaUsuario: string = '';
  listaProductos: ProductoStockResponse[]=[];
  actualizacionRequest: ActualizacionProductoRequest = {} as ActualizacionProductoRequest;

  ngOnInit(){
    this.cargarStockProductos();
    this.nombreLineaUsuario = this.sessionService.getNombreLinea();
  }

  cargarStockProductos(){
    this.inventarioService.listarStockProductos().subscribe({
      next: (respuestaBackend) => {
        this.listaProductos = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Stock productos cargados correctamente')
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  actualizarProductoRotacion(id: number, producto: string){
    this.actualizacionRequest.rotacion=producto;
    this.inventarioService.actualizarRotacion(id,this.actualizacionRequest ).subscribe({
      next: (respuestaBackend) => {
        console.log('Rotación de producto actualizada correctamente',respuestaBackend);  
        this.toastService.success('Rotación de producto actualizada correctamente'); 
        this.cdr.detectChanges();
        const index = this.listaProductos.findIndex(p => p.productoId === id);

        if (index !== -1) {
          this.listaProductos[index].rotacion = respuestaBackend.rotacion;
          this.cdr.detectChanges();
        }
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });
  }
}
