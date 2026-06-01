import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Observable, map, timer } from 'rxjs';
import { CompraService } from '../../services/compra.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { OrdenCompraListResponse } from '../../models/response/orden-compra-list-response';
import { OrdenCompraSimpleListResponse } from '../../models/response/orden-compra-simple-list-response';

// Importaciones de pdfmake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-tarjeta-orden-compra',
  imports: [DatePipe, CurrencyPipe],
  providers: [DatePipe],
  templateUrl: './tarjeta-orden-compra.html',
  styleUrl: './tarjeta-orden-compra.scss',
})
export class TarjetaOrdenCompra implements OnInit{
  private compraService = inject(CompraService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private datePipe = inject(DatePipe);

  textoActualizacion$!: Observable<string>;

  listaOrdenesCompraSimple: OrdenCompraSimpleListResponse[]=[];
  ordenCompraSeleccionada: OrdenCompraListResponse | null= null;

  proveedoresUnicos: string[]=[];
  ordenesFiltradas: OrdenCompraSimpleListResponse[] = [];
  ordenSeleccionadaId: number | null = null;

  ngOnInit() {
    this.cargarOrdenesCompraVistaSimple();

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

  cargarOrdenesCompraVistaSimple(){
    this.compraService.listarOrdenesCompraSimple().subscribe({
      next: (respuestaBackend) => {
        this.listaOrdenesCompraSimple=respuestaBackend;
        this.proveedoresUnicos = [...new Set(this.listaOrdenesCompraSimple.map(orden => orden.nombreProveedor))];
        this.cdr.detectChanges();
        console.log('Lista órdenes compra simple cargado correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend);
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  onProveedorSeleccionado(event: Event){
    const proveedorSeleccionado = (event.target as HTMLSelectElement).value;
    
    this.ordenesFiltradas = this.listaOrdenesCompraSimple.filter(
      (orden) => orden.nombreProveedor === proveedorSeleccionado
    );

    this.ordenSeleccionadaId = null;
  }

  onOrdenSeleccionada(event: Event) {
    const valorHTML = (event.target as HTMLSelectElement).value;
    
    this.ordenSeleccionadaId = Number(valorHTML); 
    
    console.log("Orden seleccionada:", this.ordenSeleccionadaId);
    this.compraService.listarOrdenesCompra(this.ordenSeleccionadaId).subscribe({
        next: (respuestaBackend) => {
          this.ordenCompraSeleccionada=respuestaBackend[0];
          this.cdr.detectChanges();
          console.log('Orden compra cargado correctamente',respuestaBackend);
        },
        error: (errorBackend) => {
          console.error('Estructura completa del error',errorBackend);
          
          const mensaje = errorBackend.error?.message || 'Error desconocido'
          this.toastService.error(mensaje);
        }
    })
  }

  get totalEstimado(): number {
    // Si no hay orden seleccionada o no tiene productos, el total es 0
    if (!this.ordenCompraSeleccionada || !this.ordenCompraSeleccionada.productos) {
      return 0;
    }

    // Recorremos el arreglo de productos acumulando la suma
    return this.ordenCompraSeleccionada.productos.reduce((acumulador, producto) => {
      const subtotal = producto.precioUnidad * producto.cantidad;
      return acumulador + subtotal;
    }, 0); // El 0 es el valor inicial del acumulador
  }

  generarEtiquetaOrden(orden: OrdenCompraSimpleListResponse): string {
    const prefijo = `OC-${orden.ordenCompraId} | `;

    if (orden.fechaEntrega) {
      return prefijo + 'Entregada';
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaPlazo = new Date(orden.fechaPlazoMaximo);
    fechaPlazo.setHours(0, 0, 0, 0);

    if (fechaPlazo < hoy) {
      return prefijo + 'Plazo vencido';
    } 

    else {
      const fechaFormateada = this.datePipe.transform(fechaPlazo, 'dd/MM/yyyy');
      return prefijo + 'Vence ' + fechaFormateada;
    }
  }

// --- MÉTODO PARA GENERAR EL PDF ---
  generarDocumentoFormalPDF() {
    if (!this.ordenCompraSeleccionada) return;

    // Formateamos las fechas para que se vean limpias en el PDF
    const fechaEntregaFmt = this.datePipe.transform(this.ordenCompraSeleccionada.fechaEntrega, 'dd/MM/yyyy') || 'N/A';
    const plazoMaximoFmt = this.datePipe.transform(this.ordenCompraSeleccionada.plazoFechaMaximo, 'dd/MM/yyyy') || 'N/A';
    const fechaActualFmt = this.datePipe.transform(new Date(), 'dd/MM/yyyy') || 'N/A';

    const definicionDocumento: any = {
      pageSize: 'A4',
      pageMargins: [ 40, 60, 40, 60 ],

      content: [
        // Encabezado
        {
          columns: [
            {
              text: 'FERRETERIA PERUANA S.A.\nLogística',
              style: 'datosEmpresa'
            },
            {
              text: `ORDEN DE COMPRA\nN° OC-${this.ordenCompraSeleccionada.ordenCompraId}`,
              style: 'tituloDocumento',
              alignment: 'right'
            }
          ]
        },
        
        { text: '\n\n' },

        // Datos del Proveedor
        {
          text: [
            { text: 'DATOS DEL PROVEEDOR\n', bold: true, fontSize: 11 },
            `Razón Social: ${this.ordenCompraSeleccionada.nombreProveedor}\n`,
            `Fecha de Entrega: ${fechaEntregaFmt}\n`,
            `Plazo Máximo de Entrega: ${plazoMaximoFmt}\n`,
            `Fecha de Generación del Reporte: ${fechaActualFmt}`
          ],
          margin: [0, 0, 0, 20]
        },

        // Tabla de productos
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
              // Encabezados
              [ 
                { text: 'Cant.', bold: true, fillColor: '#f1f5f9', margin: [5, 5, 5, 5] }, 
                { text: 'Descripción del Producto', bold: true, fillColor: '#f1f5f9', margin: [5, 5, 5, 5] }, 
                { text: 'P. Unitario', bold: true, fillColor: '#f1f5f9', margin: [5, 5, 5, 5] }, 
                { text: 'Total', bold: true, fillColor: '#f1f5f9', margin: [5, 5, 5, 5] } 
              ],
              
              // Filas dinámicas de productos
              ...this.ordenCompraSeleccionada.productos.map((prod: any) => [
                { text: prod.cantidad, margin: [5, 5, 5, 5] },
                
                // Aquí aplicamos lo del nombreProducto y nombreLinea
                {
                  margin: [5, 5, 5, 5],
                  text: [
                    { text: prod.nombreProducto, bold: true, fontSize: 10 },
                    { text: `\n${prod.nombreLinea}`, fontSize: 8, color: '#64748b' }
                  ]
                },
                
                { text: `S/ ${prod.precioUnidad.toFixed(2)}`, margin: [5, 5, 5, 5] },
                { text: `S/ ${(prod.precioUnidad * prod.cantidad).toFixed(2)}`, margin: [5, 5, 5, 5] }
              ])
            ]
          },
          layout: 'lightHorizontalLines' // Le da un diseño de tabla más limpio y profesional
        },

        { text: '\n' },

        // Total Estimado
        {
          text: `SUBTOTAL: S/ ${this.totalEstimado.toFixed(2)}`,
          bold: true,
          fontSize: 14,
          alignment: 'right',
          margin: [0, 10, 0, 0]
        },
        {
          text: `TOTAL ESTIMADO (IGV): S/ ${(this.totalEstimado*1.18).toFixed(2)}`,
          bold: true,
          fontSize: 14,
          alignment: 'right',
          margin: [0, 10, 0, 0]
        }
      ],

      styles: {
        tituloDocumento: {
          fontSize: 18,
          bold: true,
          color: '#0284c7'
        },
        datosEmpresa: {
          fontSize: 10,
          color: '#475569',
          bold: true
        }
      }
    };

// 1. Buscamos el generador real (sacándolo del envoltorio 'default' si existe)
    const generadorPdf = (pdfMake as any).default || pdfMake;

    // 2. Extraemos las fuentes de forma segura
    const fuentes = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : (pdfFonts as any).vfs;

    // 3. Generamos el PDF usando el generador correcto
    generadorPdf.createPdf(
      definicionDocumento, 
      undefined, 
      undefined, 
      fuentes
    ).download(`OC-${this.ordenCompraSeleccionada.ordenCompraId}.pdf`);
  }
}
