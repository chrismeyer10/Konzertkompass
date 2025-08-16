import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { BackgroundService } from './background.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Titel der Anwendung */
  protected readonly title = signal('Konzertkompass');

  /**
   * Initialisiert den Root-Component und lädt ein zuvor
   * gespeichertes Hintergrundbild.
   */
  constructor(
    public auth: AuthService,
    private router: Router,
    private bg: BackgroundService
  ) {
    this.bg.loadSavedBackground();
  }

  /**
   * Meldet den Benutzer ab und leitet zur Login-Seite weiter.
   */
  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }
}
