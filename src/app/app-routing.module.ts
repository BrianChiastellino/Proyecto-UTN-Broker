import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { LandingPageComponent } from './modules/landing/components/landing-page/landing-page.component';
import { RegistroComponent } from './modules/auth/registro/registro.component';
import { MainPageComponent } from './modules/main/components/main-page/main-page.component';
import { authGuard } from './core/services/auth-services/guards/auth.guard';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'register',
    component: RegistroComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error',
    component: Error404Component,
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
