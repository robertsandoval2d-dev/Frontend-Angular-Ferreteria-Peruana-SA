import { Component, inject } from '@angular/core';
import { Router , RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-public',
  imports: [RouterLink],
  templateUrl: './header-public.html',
  styleUrl: './header-public.scss',
})
export class HeaderPublic {
  private router = inject(Router);

  irALogin() {
    this.router.navigate(['/login']);
  }
}
