import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any | null>(null);
  private readonly platformId = inject(PLATFORM_ID);
  private storage = isPlatformBrowser(this.platformId)
    ? window.localStorage
    : null;

  constructor() {
    const stored = this.storage?.getItem('currentUser');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }

  setUser(user: any) {
    this.user.set(user);
    this.storage?.setItem('currentUser', JSON.stringify(user));
  }

  clearUser() {
    this.user.set(null);
    this.storage?.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  register(username: string, password: string): boolean {
    const users = JSON.parse(this.storage?.getItem('users') || '[]');
    if (users.some((u: any) => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    this.storage?.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(this.storage?.getItem('users') || '[]');
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
