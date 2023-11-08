import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { CoinApiModule } from '../coinApi/coin-api.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingRoutingModule,
    CoinApiModule
  ]
})
export class LandingModule { }
