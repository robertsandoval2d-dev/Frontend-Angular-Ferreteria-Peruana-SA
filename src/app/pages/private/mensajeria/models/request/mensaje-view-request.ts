export interface MensajeViewRequest{
    mensajeId: number;
    titulo: string;
    mensaje: string;
    emisorId: number;
    emisorUsername: string;
    receptorId: number;
    receptorUsername: string;
    fechaEnvio: string;
    leido: boolean;
}