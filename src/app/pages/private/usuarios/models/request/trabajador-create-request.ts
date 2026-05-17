export interface TrabajadorCreateRequest {
    nombre: string;
    dni: string;
    username: string;
    password?: string;
    rol: string;
    tiendaId?: number;
    lineaId?: number;
}
