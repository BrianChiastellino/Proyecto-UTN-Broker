import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coin, CoinApi } from 'src/app/core/Models';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges{

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Desde buy',this.coinSelected);
    this.coinCompra = this.coinSelected;
    console.log('Desde el this', this.coinCompra);
  }


  //todo: hacer la logica desde la compra de la moenda con un pop-up










}
