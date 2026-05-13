import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPrivate } from '../../shared/components/header-private/header-private';
import { Footer } from '../../shared/components/footer/footer';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, HeaderPrivate, Footer, Sidebar],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.scss',
})
export class PrivateLayout {}
