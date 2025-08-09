import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { BackgroundService } from './background.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Konzertkompass');

  constructor(
    public auth: AuthService,
    private router: Router,
    private bg: BackgroundService
  ) {
    this.bg.loadSavedBackground();
  }

  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }
}
