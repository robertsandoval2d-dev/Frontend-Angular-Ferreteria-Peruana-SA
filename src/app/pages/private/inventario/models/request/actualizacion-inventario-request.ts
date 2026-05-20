import { DetalleProductoInventario } from "./detalle-producto-inventario";

export interface ActualizacionInventarioRequest{
    ordenCompraId: number;
    productos: DetalleProductoInventario[];
}