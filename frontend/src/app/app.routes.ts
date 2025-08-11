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
  {
    path: 'bands2',
    loadComponent: () =>
      import('./band2-list.component').then((m) => m.Band2ListComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];