import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoinsComponent } from './components/view-coins/view-coins.component';
import { CoinsComponent } from './components/coins/coins.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewCoinsComponent,
    CoinsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CoinsComponent,
    ViewCoinsComponent
  ]
})
export class CoinsModule { }
