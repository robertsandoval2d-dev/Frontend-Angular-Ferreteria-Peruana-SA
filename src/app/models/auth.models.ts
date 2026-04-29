// Esto es el espejo de UsuarioRequest.java
export interface LoginRequest {
  username: string;
  password: string;
}

// Esto es el espejo de AuthResponse.java
export interface LoginResponse {
  token: string;
}