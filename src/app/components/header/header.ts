import { Component } from '@angular/core';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router) {}

  irALogin() {
    this.router.navigate(['/login']);
  }
}
