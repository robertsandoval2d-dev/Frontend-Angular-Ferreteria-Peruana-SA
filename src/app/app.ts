import { Component, signal } from '@angular/core';
import { RouterOutlet, Router,NavigationEnd } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
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
