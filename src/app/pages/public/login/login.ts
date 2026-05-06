import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- VITAL para que los inputs funcionen
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // (Ajusta la ruta si es necesario)
import { LoginRequest } from '../../../models/auth.models'; //ADDED

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], //ADDED
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export class Login { //ADDED
  credenciales: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() { //ADDED
    // El .subscribe() es el que "aprieta el gatillo". Sin él, la petición no viaja.
    console.log('Enviando al backend:', this.credenciales);

    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        // Si el backend dice "Todo OK"
        console.log('¡Login exitoso!', respuesta.token);
        
        // Guardamos la "llave" en el navegador
        localStorage.setItem('token', respuesta.token);
        
        // Lo mandamos a la página principal
        this.router.navigate(['/']); 
      },
      error: (err) => {
        // Si el backend dice "Contraseña incorrecta" o hay error
        console.error('Error al iniciar sesión', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}