import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CoinApi } from 'src/app/core/Models';
import { CoinApiService } from 'src/app/core/services/coin-api.service';

@Component({
  selector: 'app-coin-api',
  templateUrl: './coin-api.component.html',
  styleUrls: ['./coin-api.component.css']
})

export class CoinsApiComponent implements OnInit {

  allCoins: Array<CoinApi> = [];

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.getCoins();
  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getCoins();
    alert('Se actualizo la lista');
  }

//todo mndarlo al servicio.
  public async getCoins() {

    try {

      let response = this.coinApiService.getAllCoins();

      const data = await lastValueFrom(response);
      console.log('Conectando a la api OK');
      this.allCoins = data.map((dataCoins: any) => new CoinApi(dataCoins));

    } catch (error) {
      console.error('Error al querer obtener coins');
    }
  }



}


