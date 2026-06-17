export interface PedidoResponse{
    clienteId: number;
    nombreCliente: string;
    pedidoId: number;
    fechaMaximaEntrega: string;
    fechaEntrega: string;
    diasRetraso: number;
    montoTotalPedido: number;
    estado: string;
}