import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { InventarioService } from '../../services/inventario.service';
import { ProductoStockResponse } from '../../models/response/producto-stock-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { SessionService } from '../../../../../core/auth/services/session.service';

@Component({
  selector: 'app-tabla-stock',
  imports: [],
  templateUrl: './tabla-stock.html',
  styleUrl: './tabla-stock.scss',
})
export class TablaStock implements OnInit{
  private inventarioService = inject(InventarioService);
  private toastService = inject(ToastService);
  private sessionService = inject(SessionService);
  private cdr = inject(ChangeDetectorRef);

  textoActualizacion$!: Observable<string>;

  nombreLineaUsuario: string = '';
  listaProductos: ProductoStockResponse[]=[];

  ngOnInit(){
    this.cargarStockProductos();
    this.nombreLineaUsuario = this.sessionService.getNombreLinea();

    const tiempoCarga = new Date();

    this.textoActualizacion$ = interval(60000).pipe(
      startWith(0), // Para que muestre el texto de inmediato y no espere 1 min
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

}
