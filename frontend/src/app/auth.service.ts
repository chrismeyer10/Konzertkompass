import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any | null>(null);

  setUser(user: any) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }
}
