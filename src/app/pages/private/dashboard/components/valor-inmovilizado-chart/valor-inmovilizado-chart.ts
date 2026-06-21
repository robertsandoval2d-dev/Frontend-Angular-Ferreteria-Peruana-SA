import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexResponsive,
  NgApexchartsModule,
  ApexLegend
} from 'ng-apexcharts';
import { DashboardService } from '../../services/dashboard.service';
import { ValorInmovilizadoResponse } from '../../models/response/valor-inmovilizado-response';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-valor-inmovilizado-chart',
  imports: [NgApexchartsModule],
  templateUrl: './valor-inmovilizado-chart.html',
  styleUrl: './valor-inmovilizado-chart.scss',
})
export class ValorInmovilizadoChart implements OnInit{

  @ViewChild('chart') chart!: ChartComponent;
  
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);

  public chartOptions: Partial<ChartOptions> = {};
  public listaValorInmovilizado: ValorInmovilizadoResponse[] = [];

  constructor() {
    this.chartOptions = {
      series: [],
      legend: {
        show: false 
      },
      chart: {
        type: 'bar',
        height: 400,
        toolbar: { show: true }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: false, 
          distributed: true, 
          columnWidth: '45%', 
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          return val >= 1000 ? `S/ ${(val / 1000).toFixed(1)}k` : `S/ ${val}`;
        },
        style: {
          fontSize: '11px',
          colors: ['#304758']
        },
        offsetY: -20
      },
      xaxis: {
        categories: [],
        tickPlacement: 'on',
        labels: {
          rotate: -35, 
          rotateAlways: true, 
          hideOverlappingLabels: false, 
          trim: false, // Agrega "..." si el texto es absurdamente largo
          maxHeight: 110, // Le da 120px de espacio al contenedor inferior para que el texto rotado no se corte
          style: {
            fontSize: '11px',
            fontFamily: 'inherit',
            cssClass: 'apexcharts-xaxis-label',
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return `S/ ${val.toLocaleString('es-PE')}`; // Formato de moneda peruana en el eje Y
          }
        }
      },
      tooltip: {
        // Inicializado vacío, se llena en el subscribe
      },
      colors: [],
      responsive: [
        {
          // Para laptops pequeñas o tablets en horizontal
          breakpoint: 1400,
          options: {
            chart: { 
              height: 350 // Reducimos un poco la altura
            },
            xaxis: {
              title: { style: { fontSize: '12px' } }
            },
            yaxis: {
              title: { style: { fontSize: '12px' } }
            }
          }
        },
        {
          // Para tablets en vertical y celulares
          breakpoint: 992, 
          options: {
            chart: { 
              height: 300 // Lo hacemos más bajito para que quepa en la pantalla del celular
            },
            markers: {
              size: 4, // Achicamos los puntos de dispersión para que no se amontonen
              hover: { sizeOffset: 2 }
            },
            xaxis: {
              title: { style: { fontSize: '11px' } },
              labels: { style: { fontSize: '10px' } }
            },
            yaxis: {
              title: { style: { fontSize: '11px' } },
              labels: { style: { fontSize: '10px' } }
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.getValorInmovilizadoXProducto();
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

  getValorInmovilizadoXProducto(): void {
    this.dashboardService.listarValorInmovilizadoProductos().subscribe({
      next: (respuestaBackend) =>{
        this.listaValorInmovilizado = respuestaBackend
          .sort((a, b) => b.valorMonetario - a.valorMonetario)
          .slice(0, 10);
        this.cdr.detectChanges();
        console.log('Lista valor inmovilizado x producto cargada correctamente',respuestaBackend);
        
        const categoriasX = this.listaValorInmovilizado.map(item => item.producto);
        const valoresY = this.listaValorInmovilizado.map(item => item.valorMonetario);
        const coloresEsteticos = this.getPaletteColors(this.listaValorInmovilizado.length);

        this.chartOptions = {
          ...this.chartOptions,
          colors: coloresEsteticos,
          series: [
            {
              name: 'Capital Inmovilizado',
              data: valoresY
            }
          ],
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: categoriasX
          },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              const item = this.listaValorInmovilizado[dataPointIndex];
              
              // 1. Definimos las variables con los colores hexadecimales por defecto (Gris)
              let bgRotacion = '#f3f4f6'; 
              let textRotacion = '#1f2937';
              
              // 2. Reasignamos los colores según el nivel de rotación
              if(item.rotacion === 'BAJA') { 
                bgRotacion = '#fee2e2';    // Equivalente a bg-red-100
                textRotacion = '#991b1b';  // Equivalente a text-red-800
              }
              if(item.rotacion === 'MEDIA') { 
                bgRotacion = '#fef3c7';    // Equivalente a bg-yellow-100
                textRotacion = '#92400e';  // Equivalente a text-yellow-800
              }
              if(item.rotacion === 'ALTA') { 
                bgRotacion = '#d1fae5';    // Equivalente a bg-green-100
                textRotacion = '#065f46';  // Equivalente a text-green-800
              }

              return `
                <div class="p-3 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
                  <div class="text-xs text-gray-500 mb-1 uppercase tracking-wider">${item.categoria}</div>
                  <div class="font-bold text-gray-800 border-b pb-2 mb-2">${item.producto}</div>
                  
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600">Valor Total:</span>
                    <span class="font-bold" style="color: #2563eb;">S/ ${item.valorMonetario.toLocaleString('es-PE')}</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Rotación:</span>
                    <span style="background-color: ${bgRotacion}; color: ${textRotacion}; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold;">
                      ${item.rotacion}
                    </span>
                  </div>
                </div>
              `;
            }
          }
        };
        this.cdr.detectChanges();
      },
      error: (errorBackend) => {
        console.error('Error al cargar el gráfico',errorBackend);
      }
    });
  }
}
