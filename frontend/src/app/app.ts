import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Konzertkompass');

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }
}
