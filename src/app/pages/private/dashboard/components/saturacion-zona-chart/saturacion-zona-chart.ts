import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  NgApexchartsModule,
  ApexResponsive
} from 'ng-apexcharts';
import { DashboardService } from '../../services/dashboard.service';
import { SaturacionXZonaAlmacenResponse } from '../../models/response/saturacion-xzona-almacen-response';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  colors: string[]; 
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-saturacion-zona-chart',
  imports: [NgApexchartsModule],
  templateUrl: './saturacion-zona-chart.html',
  styleUrl: './saturacion-zona-chart.scss',
})
export class SaturacionZonaChart implements OnInit{
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('chart') chart!: ChartComponent;
  
  public chartOptions: Partial<ChartOptions> = {};
  public listaSaturacionXZonaAlmacen: SaturacionXZonaAlmacenResponse[] = [];

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
          distributed:true,
        }
      },
      colors: [], // Se llenará con función automática
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        }
      },
      xaxis: {
        categories: [],
        max: 100, 
      },
      tooltip: {
        // Se llenará al cargar los datos
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300 
            },
            dataLabels: {
              style: {
                fontSize: '10px'
              }
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px'
                }
              }
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.getSaturacionXZonaAlmacen();
  }

  private getPaletteColors(count: number): string[] {
    const palette = [
      '#3B82F6', // Blue
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#8B5CF6', // Violet
      '#14B8A6', // Teal
      '#F97316', // Orange
      '#EC4899', // Pink
      '#06B6D4', // Cyan
      '#84CC16', // Lime
      '#6366F1', // Indigo
      '#F43F5E', // Rose
      '#D946EF', // Fuchsia
      '#EAB308', // Yellow
      '#0EA5E9'  // Sky
    ];
    
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(palette[i % palette.length]);
    }
    return colors;
  }

  getSaturacionXZonaAlmacen(): void {

    this.dashboardService.listarSaturacionXZonaAlmacen().subscribe({
      next: (respuestaBackend) =>{
        this.listaSaturacionXZonaAlmacen = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista saturación x zona almacén cargado correctamente',respuestaBackend);

        const categoriasY = this.listaSaturacionXZonaAlmacen.map(item => item.categoriaZona);
        const porcentajesX = this.listaSaturacionXZonaAlmacen.map(item => item.porcentajeOcupacion);
        const coloresGenerados = this.getPaletteColors(this.listaSaturacionXZonaAlmacen.length);

        this.chartOptions = {
          ...this.chartOptions,
          colors: coloresGenerados,
          series: [
            {
              name: 'Ocupación',
              data: porcentajesX
            }
          ],
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: categoriasY
          },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              const item = this.listaSaturacionXZonaAlmacen[dataPointIndex];
              
              return `
                <div class="p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div class="font-bold text-gray-800 border-b pb-1 mb-2">${item.categoriaZona}</div>
                  <div class="text-sm text-gray-700 mb-1">
                    Saturación: <span class="font-bold text-blue-600">${item.porcentajeOcupacion}%</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    Ocupado: <span class="font-medium text-gray-700">${item.capacidadActual}</span> uds.
                  </div>
                  <div class="text-xs text-gray-500">
                    Máximo: <span class="font-medium text-gray-700">${item.capacidadMaxima}</span> uds.
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
