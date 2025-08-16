import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
/** Dienst zur Verwaltung des Anmeldezustands. */
export class AuthService {
  /** Aktuell eingeloggter Benutzer */
  user = signal<any | null>(null);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Lädt einen eventuell gespeicherten Benutzer aus dem lokalen Speicher.
   */
  constructor() {
    const stored = this.getStorage()?.getItem('currentUser');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }

  /**
   * Liefert den Storage, falls im Browser ausgeführt.
   */
  private getStorage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? window.localStorage : null;
  }

  /**
   * Setzt den angemeldeten Benutzer und speichert ihn lokal.
   */
  setUser(user: any) {
    this.user.set(user);
    this.getStorage()?.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Löscht den Benutzer aus dem Speicher und dem Signal.
   */
  clearUser() {
    this.user.set(null);
    this.getStorage()?.removeItem('currentUser');
  }

  /**
   * Prüft, ob ein Benutzer angemeldet ist.
   */
  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  /**
   * Registriert einen neuen Benutzer im lokalen Speicher.
   */
  register(username: string, password: string): boolean {
    const storage = this.getStorage();
    if (!storage) {
      return false;
    }
    const users = JSON.parse(storage.getItem('users') || '[]');
    if (users.some((u: any) => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    storage.setItem('users', JSON.stringify(users));
    return true;
  }

  /**
   * Meldet einen Benutzer an, wenn die Zugangsdaten passen.
   */
  login(username: string, password: string): boolean {
    const storage = this.getStorage();
    const users = JSON.parse(storage?.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (user) {
      this.setUser({ username: user.username });
      return true;
    }
    return false;
  }
}
