import { DetalleOCList } from "./detalle-oc-list";

export interface OrdenCompraListResponse{
    ordenCompraId: number;
    nombreProveedor: string;
    fechaEntrega?: string;
    plazoFechaMaximo: string;
    productos: DetalleOCList[];
}