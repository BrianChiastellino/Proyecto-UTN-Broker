import { CanActivateFn } from '@angular/router';

//todo: Terminar el guard.

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
