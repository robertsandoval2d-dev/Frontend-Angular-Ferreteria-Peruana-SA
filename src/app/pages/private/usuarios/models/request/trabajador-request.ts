export interface TrabajadorRequest {
    nombre: string;
    dni: string;
    username: string;
    password?: string;
    rol: string;
    tiendaId?: number;
    lineaId?: number;
}
