import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CoinsApiComponent } from './components/coin-Api/coin-api.component';
import { ViewCoinsApiComponent } from './components/view-coins-api/view-coins-api.component';
import { BuyCoinsApiComponent } from './components/buy-coins-api/buy-coins-api.component';
import { SellCoinsComponent } from './components/sell-coins/sell-coins.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    // CoinsApiComponent,
    ViewCoinsApiComponent,
    BuyCoinsApiComponent,
    SellCoinsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    // CoinsApiComponent,
    ViewCoinsApiComponent,
    BuyCoinsApiComponent,
    SellCoinsComponent
  ]
})
export class CoinApiModule { }
