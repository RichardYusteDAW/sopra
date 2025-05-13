import { Routes } from '@angular/router';

export const DogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dog.component').then((m) => m.DogComponent),
  },
];
