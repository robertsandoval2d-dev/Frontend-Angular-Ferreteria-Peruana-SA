import { Proveedor } from "./proveedor";

export interface ProductoCatalogoResponse{
    productoId: number;
    nombre: string;
    proveedores: Proveedor[];
}