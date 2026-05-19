import { DetalleCronograma } from "./detalle-cronograma";

export interface CronogramaResponse{
    cronogramaId: number;
    nombreLineaProductos: string;
    detallesCronograma: DetalleCronograma[]; 
}