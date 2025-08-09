import { AfterViewInit, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  user = signal<any | null>(null);

  ngAfterViewInit() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: 'GOOGLE_CLIENT_ID',
        callback: (resp: any) => this.user.set(resp),
      });
      google.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'outline', size: 'large' }
      );
    }
  }

  signOut() {
    this.user.set(null);
  }
}
