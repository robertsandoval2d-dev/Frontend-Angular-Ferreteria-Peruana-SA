import { DetalleCronograma } from "./detalle-cronograma";

export interface CronogramaResponse{
    cronogromaId: number;
    nombreLineaProductos: string;
    detallesCronograma: DetalleCronograma[]; 
}