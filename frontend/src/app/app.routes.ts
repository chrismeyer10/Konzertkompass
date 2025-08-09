import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'bands',
    loadComponent: () =>
      import('./band-list.component').then((m) => m.BandListComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];