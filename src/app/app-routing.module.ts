import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { LandingPageComponent } from './modules/landing/landing-page.component';
import { RegistroComponent } from './modules/auth/registro/registro.component';

const routes: Routes = [
  {
  path: 'landing',
  component: LandingPageComponent,
  loadChildren:()=> import('./modules/landing/landing-routing.module').then(m=>m.LandingRoutingModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren:()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'register',
    component: RegistroComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
