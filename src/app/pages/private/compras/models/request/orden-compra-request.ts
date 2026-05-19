import { DetalleOrdenCompra } from "./detalle-orden-compra";

export interface OrdenCompraRequest{
    plazoFechaMaximo: string;
    proveedorId: number;
    montoTotalCalculado: number;
    detalles: DetalleOrdenCompra[];
}