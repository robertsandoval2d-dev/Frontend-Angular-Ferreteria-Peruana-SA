import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SessionService } from '../../../core/auth/services/session.service';
import { LoginRequest } from '../../../core/auth/models/request/login-request';
import { LoginResponse } from '../../../core/auth/models/response/login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export class Login { 
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  loginRequest: LoginRequest = {} as LoginRequest;
  loginResponse: LoginResponse = {} as LoginResponse; 

  form = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  iniciarSesion() { 
    if(this.form.invalid) return;

    const{username,password} = this.form.value;
    if(!username || !password) return;
    //console.log('Enviando al backend:', this.loginRequest);

    this.loginRequest.username=username;
    this.loginRequest.password=password;

    this.authService.login(this.loginRequest).subscribe({
      next: (respuesta: LoginResponse) => {
        // Si el backend dice "Todo OK"
        this.loginResponse = respuesta;
        console.log('¡Login exitoso!', this.loginResponse);
        
        // Guardamos la "llave" en el navegador
        this.authService.setToken(this.loginResponse.token);
        console.log(this.sessionService.getInfoSession());
        
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