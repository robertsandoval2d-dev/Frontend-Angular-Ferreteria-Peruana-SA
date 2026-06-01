export interface OrdenCompraSimpleListResponse{
    ordenCompraId: number;
    nombreProveedor: string;
    fechaEntrega?: string;
    fechaPlazoMaximo: string;
}