import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinApiModule } from '../coinApi/coin-api.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    LandingPageComponent,

  ],
  imports: [
    CommonModule,
    CoinApiModule,
    SharedModule,
  ],


})
export class LandingModule { }
