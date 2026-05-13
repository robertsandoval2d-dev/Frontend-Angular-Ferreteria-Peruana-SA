import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { HeaderPublic } from '../../shared/components/header-public/header-public';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [HeaderPublic, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {

}
