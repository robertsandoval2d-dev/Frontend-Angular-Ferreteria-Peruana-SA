import { Component } from '@angular/core';
import { Footer } from './../../components/footer/footer';
import { Header } from './../../components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {

}
