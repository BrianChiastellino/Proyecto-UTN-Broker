import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoinsApiComponent } from './components/coin-Api/coin-api.component';
import { ViewCoinsApiComponent } from './components/view-coins-api/view-coins-api.component';
import { BuyCoinsApiComponent } from './components/buy-coins-api/buy-coins-api.component';



@NgModule({
  declarations: [
    CoinsApiComponent,
    ViewCoinsApiComponent,
    BuyCoinsApiComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoinsApiComponent,
    ViewCoinsApiComponent
  ]
})
export class CoinApiModule { }
