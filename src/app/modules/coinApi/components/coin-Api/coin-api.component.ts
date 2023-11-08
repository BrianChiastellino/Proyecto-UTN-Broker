import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CoinApi, User } from 'src/app/core/Models';
import { CoinApiService } from '../../services/coin-api.service';

@Component({
  selector: 'app-coin-api',
  templateUrl: './coin-api.component.html',
  styleUrls: ['./coin-api.component.css']
})

export class CoinsApiComponent implements OnInit {

  allCoins: Array<CoinApi> = [];
  coin!: CoinApi;
  





  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())


    

  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {

    alert('Se actualizo la lista');
  }

  public getAllCoins () : void {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())
   }

  public enviarCoin(coin: CoinApi){
    this.coin = coin;
    console.log('Desde coinapp',this.coin)
  }







}