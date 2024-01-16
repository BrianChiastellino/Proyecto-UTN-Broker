import { CoinApiService } from 'src/app/modules/coinApi/services/coin-api.service';
import { CoinApi, User } from './../../../../core/Models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userLoged!: User;
  allCoins: Array<CoinApi> = []
  coin!: CoinApi;
  coinToSell!: CoinApi;

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getAllCoins();
  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getAllCoins();
    alert('Se actualizo la lista');
  }

  public getAllCoins(): void {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())

  }

  public enviarCoin(coin: CoinApi){
    this.coin = coin;
    console.log('Desde funcion compra',this.coin)
  }

  public enviarCoinToSell(coin: CoinApi){
    this.coinToSell = coin;
  }











}
