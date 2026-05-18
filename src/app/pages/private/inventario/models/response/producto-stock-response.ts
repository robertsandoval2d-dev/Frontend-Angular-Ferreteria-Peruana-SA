export interface ProductoStockResponse{
    productoId: number;
    nombre: string;
    stockActual: number;
    stockMinimo: number;
    rotacion: string;
    categoria: string;
}