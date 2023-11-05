import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Coin } from 'src/app/core/Models';
import { CoinApiService } from 'src/app/core/services/coin-api.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  allCoins: Array<Coin> = [];

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.getCoins();
  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getCoins();
    alert('Se actualizo la lista');
  }

  //todo: Esto lo tieneque hacer un servicio. E inyectarlo en esta clase.
  public async getCoins() {

    try {

      let response = this.coinApiService.getAllCoins();

      const data = await lastValueFrom(response);
      console.log('Conectando a la api OK');
      this.allCoins = data.map((dataCoins: any) => new Coin(dataCoins));

    } catch (error) {
      console.error('Error al querer obtener coins');
    }
  }



}
