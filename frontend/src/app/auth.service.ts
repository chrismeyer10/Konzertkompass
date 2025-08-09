import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any | null>(null);

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }

  setUser(user: any) {
    this.user.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearUser() {
    this.user.set(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
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
