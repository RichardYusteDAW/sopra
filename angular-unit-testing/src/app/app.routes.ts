import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cat',
    loadChildren: () =>
      import('./pages/cat/cat.routes').then((m) => m.CatRoutes),
  },
  {
    path: 'dog',
    loadChildren: () =>
      import('./pages/dog/dog.routes').then((m) => m.DogRoutes),
  },
];
