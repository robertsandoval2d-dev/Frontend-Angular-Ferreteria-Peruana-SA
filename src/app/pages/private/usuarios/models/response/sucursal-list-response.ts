export interface LineasProducto{
        lineaId: number;
        nombreLinea: string;
    }

export interface SucursalListResponse{
        tiendaId: number;
        nombreTienda: string;
        lineasProducto: LineasProducto[];
    }


