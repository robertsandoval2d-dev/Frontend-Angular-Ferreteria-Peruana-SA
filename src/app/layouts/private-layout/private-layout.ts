import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.scss',
})
export class PrivateLayout {}
