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
    path: 'find-my-concert',
    loadComponent: () =>
      import('./find-my-concert/find-my-concert.component').then(
        (m) => m.FindMyConcertComponent
      ),
  },
  {
    path: 'find-my-concert/:band',
    loadComponent: () =>
      import('./find-my-concert/band-concert-map.component').then(
        (m) => m.BandConcertMapComponent
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];