import { DetalleVistaPreviaOC } from "./detalle-vista-previa-oc";

export interface VistaPreviaOCResponse{
    proveedorId: number;
    nombreProveedor: string;
    montoTotalCalculado: number;
    detalles: DetalleVistaPreviaOC[];
}