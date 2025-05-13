import { CanActivateFn } from '@angular/router';

export const blogGuard: CanActivateFn = (route, state) => {
  return false;
};
