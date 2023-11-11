import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coin, CoinApi } from 'src/app/core/Models';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges{

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;
  showForm = true;

  cantidad : number = 0;
  pesos : number = 0;
  valorCompra : number = 0;
  valorCompraPesos : number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Desde buy',this.coinSelected);
    this.coinCompra = this.coinSelected;
    console.log('Desde el this', this.coinCompra);


  }



  toggleForm() {


      this.showForm = !this.showForm;

  }

  calcularPrecio() {

  
    this.valorCompra = this.cantidad * this.coinSelected.current_price;
  }

  calcularCompra() {

      this.cantidad = this.pesos / this.coinSelected.current_price;

      this.valorCompraPesos = this.cantidad * this.coinSelected.current_price;

  }
  



  //todo: hacer la logica desde la compra de la moenda con un pop-up










}
