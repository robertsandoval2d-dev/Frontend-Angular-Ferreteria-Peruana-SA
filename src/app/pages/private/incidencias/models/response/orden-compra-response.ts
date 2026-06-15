export interface OrdenCompraResponse {
    ordenCompraId: number;
    proveedor: string;
    fechaEntrega: string;
    fechaLimite: string;
    diasRetraso: number;
    estado: string;
    monto: number;
}