import { CanActivateFn } from '@angular/router';

export const activateBlogGuard: CanActivateFn = (route, state) => {
  // const activeBlog = route.queryParams['activeBlog'];
  // return activeBlog === 'true';
  return true;
};
