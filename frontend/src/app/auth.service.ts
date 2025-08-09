import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any | null>(null);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    const stored = this.getStorage()?.getItem('currentUser');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }

  private getStorage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? window.localStorage : null;
  }

  setUser(user: any) {
    this.user.set(user);
    this.getStorage()?.setItem('currentUser', JSON.stringify(user));
  }

  clearUser() {
    this.user.set(null);
    this.getStorage()?.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

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
