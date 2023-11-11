import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { authGuard } from '../../core/services/auth-services/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'myWallet',
    component: WalletComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})

export class MainRoutingModule { }
