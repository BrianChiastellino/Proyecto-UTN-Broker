import { Component, OnInit } from '@angular/core';
import { CoinApi } from 'src/app/core/Models';
import { CoinApiService } from '../../services/coin-api.service';

@Component({
  selector: 'app-coin-api',
  templateUrl: './coin-api.component.html',
  styleUrls: ['./coin-api.component.css']
})

export class CoinsApiComponent implements OnInit {

  allCoins: Array<CoinApi> = [];

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.getAllCoins();
  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getAllCoins();
    alert('Se actualizo la lista');
  }

  public getAllCoins () {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())
  }
}


