import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/work/work.component').then((m) => m.WorkComponent),
  },
  {
    path: 'work/:slug',
    loadComponent: () =>
      import('./pages/collection/collection.component').then((m) => m.CollectionComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
