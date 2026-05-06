import { Component, signal } from '@angular/core';
import { RouterOutlet, Router,NavigationEnd } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar"; // Importamos el componente Sidebar para probarlo

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Sidebar], // Agregamos Sidebar a los imports para que se pueda usar en la plantilla
  templateUrl: './components/sidebar/sidebar.html', // Predeterminado = ./app.html lo cambiamos para probar otra plantilla como /app/components/sidebar/sidebar.html
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dswG2AngularFerreteriaPeruanaSA');

  isLoginRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = event.urlAfterRedirects.includes('login');
      }
    });
  }
}

//No es la forma correcta probar la pagina aca, corregir luego**
