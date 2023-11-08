import { Injectable } from '@angular/core';
import { Coin } from '../Models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoApiService {

  urlCoinGecko: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'

  constructor(private http: HttpClient) { }

  public getAllCoins() : Observable<Coin[]>{
    return this.http.get<Coin[]>(`${this.urlCoinGecko}`);
  }

}
