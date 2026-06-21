import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexTooltip,
  NgApexchartsModule,
  ApexLegend
} from 'ng-apexcharts';
import { DashboardService } from '../../services/dashboard.service';
import { NVentasYStockXProducto } from '../../models/response/nventas-y-stock-xproducto';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-nventas-y-stock-xproducto-chart',
  imports: [NgApexchartsModule],
  templateUrl: './nventas-y-stock-xproducto-chart.html',
  styleUrl: './nventas-y-stock-xproducto-chart.scss',
})
export class NventasYStockXproductoChart implements OnInit{

  @ViewChild('chart') chart!: ChartComponent;
  
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);

  public chartOptions: Partial<ChartOptions> = {};
  public listaVentasStock: NVentasYStockXProducto[] = [];

  constructor() {
    this.chartOptions = {
      series: [],
      legend: {
        show: false 
      },
      chart: {
        height: 400,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        },
        toolbar: { show: true }
      },
      colors: [],
      dataLabels: {
        enabled: false 
      },
      markers: {
        size: 6, // Tamaño del punto de dispersión
        hover: { sizeOffset: 3 }
      },
      xaxis: {
        tickAmount: 10,
        title: {
          text: 'Ventas (Cantidad)',
          style: { fontWeight: 'bold', color: '#6B7280' }
        },
        labels: {
          formatter: function (val: any) {
            return Number(val).toFixed(0); 
          }
        }
      },
      yaxis: {
        tickAmount: 7,
        title: {
          text: 'Stock Actual en Almacén',
          style: { fontWeight: 'bold', color: '#6B7280' }
        },
        labels: {
          // Aplicamos la misma corrección aquí
          formatter: function (val: any) {
            return Number(val).toFixed(0);
          }
        }
      },
      tooltip: {
        // Inicializado vacío, la magia va en cargarDatos()
      }
    };
  }

  ngOnInit(): void {
    this.getNVentasYStockXProducto();
  }

  private getPaletteColors(count: number): string[] {
    const palette = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
      '#14B8A6', '#F97316', '#EC4899', '#06B6D4', '#84CC16', 
      '#6366F1', '#F43F5E', '#D946EF', '#EAB308', '#0EA5E9'
    ];
    
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(palette[i % palette.length]);
    }
    return colors;
  }

  getNVentasYStockXProducto(): void {
    this.dashboardService.listarNVentasYStockXProducto().subscribe({
      next: (respuestaBackend) =>{
        this.listaVentasStock = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista nventas y stock x producto cargada correctamente',respuestaBackend);

        const seriesPorProducto = this.listaVentasStock.map(item => {
          return {
            name: item.producto, // El nombre de la serie será el nombre del producto
            data: [[item.numVentas, item.stockActual]] // Coordenadas del punto único
          };
        });
        const coloresEsteticos = this.getPaletteColors(this.listaVentasStock.length);

        this.chartOptions = {
          ...this.chartOptions,
          colors: coloresEsteticos,
          series: seriesPorProducto,
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              const item = this.listaVentasStock[seriesIndex];
              
              return `
                <div class="p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div class="font-bold text-gray-800 border-b pb-2 mb-2">${item.producto}</div>
                  
                  <div class="flex justify-between items-center mb-1 gap-4">
                    <span class="text-xs text-gray-500">Stock Actual:</span>
                    <span class="font-bold text-blue-600">${item.stockActual} uds.</span>
                  </div>
                  
                  <div class="flex justify-between items-center gap-4">
                    <span class="text-xs text-gray-500">Ventas Registradas:</span>
                    <span class="font-bold text-green-600">${item.numVentas} uds.</span>
                  </div>
                </div>
              `;
            }
          }
        };

        this.cdr.detectChanges();
      }
    });
  }
}
