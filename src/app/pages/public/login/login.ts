import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/services/auth.service';
import { SessionService } from '../../../core/auth/services/session.service';
import { ToastService } from '../../../core/services/toast.service';

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
  private toastService = inject(ToastService);
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
        this.toastService.success('Ingreso exitoso');

        // Obtenemos rol
        const rol = this.sessionService.getRole();

        switch(rol){
          case'ADMIN':
            this.router.navigate(['/logistica/admin/logistica/admin']);
            break;

          case'JEFE_DE_LINEA':
            this.router.navigate(['/logistica/jefelinea']);
            break;

          case'ADMINISTRADOR_DE_TIENDA':
            this.router.navigate(['/logistica/admin-tienda']);
            break;

          case'ALMACENERO':
            this.router.navigate(['/logistica/almacenero']);
            break;

          default:
            this.router.navigate(['/logistica/admin']);
            break;
        }
      },
      error: (err) => {
        // Si el backend dice "Contraseña incorrecta" o hay error
        console.error('Error al iniciar sesión', err);
        this.toastService.error('Usuario o contraseña incorrectos');
      }
    });
  }
}