import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

//todo: Terminar el guard.

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoged = authService.checkSesionUser();

  if(!isLoged) router.navigate(['/landing']);

  return true;
};
