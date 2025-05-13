import { Routes } from '@angular/router';

export const CatRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cat.component').then((m) => m.CatComponent),
  },
];
