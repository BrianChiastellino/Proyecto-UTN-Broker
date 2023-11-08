import { Injectable } from '@angular/core';
import { CoinGeckoApiService } from 'src/app/core/services/coin-gecko-api.service';
import { lastValueFrom } from 'rxjs';
import { CoinApi } from 'src/app/core/Models';

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {

  constructor(private coinGeckoApiService: CoinGeckoApiService) { }

  public async getAllGoins() {

    try{

      let response = this.coinGeckoApiService.getAllCoins();

      const data = await lastValueFrom(response);
      console.log('Conectado con la api');
      return data.map((dataCoins: any) => new CoinApi(dataCoins));

    }
    catch(error){
      console.error('Erro al querer obtener todas las coins de gecko');
      return []
    }

  }
}
