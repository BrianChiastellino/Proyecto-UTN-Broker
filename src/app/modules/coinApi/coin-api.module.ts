import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CoinsApiComponent } from './components/coin-Api/coin-api.component';
import { ViewCoinsApiComponent } from './components/view-coins-api/view-coins-api.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    // CoinsApiComponent,
    ViewCoinsApiComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    // CoinsApiComponent,
    ViewCoinsApiComponent,

  ]
})
export class CoinApiModule { }
