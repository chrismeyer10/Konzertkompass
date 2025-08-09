import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  username = '';
  password = '';
  message = '';

  constructor(public auth: AuthService, private router: Router) {}

  ngAfterViewInit() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id:
          (import.meta as any).env['NG_APP_GOOGLE_CLIENT_ID'] ||
          'GOOGLE_CLIENT_ID',
        callback: (resp: any) => {
          this.auth.setUser(resp);
          this.router.navigate(['/bands']);
        },
      });
      google.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'outline', size: 'large' }
      );
    }
  }

  loginUser() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/bands']);
    } else {
      this.message = 'Invalid credentials';
    }
  }

  registerUser() {
    if (this.auth.register(this.username, this.password)) {
      this.message = 'Registration successful. Please log in.';
      this.username = '';
      this.password = '';
    } else {
      this.message = 'Username already exists';
    }
  }

  signOut() {
    this.auth.clearUser();
  }
}
