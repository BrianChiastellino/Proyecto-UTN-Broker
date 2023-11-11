import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class JsonWalletService {

  private urlWallet = "http://localhost:3000/wallet"

  constructor(private http: HttpClient) { }

  getAllWallets () : Observable<Wallet[]>{
    return this.http.get<Wallet[]>(`${this.urlWallet}`);
  }

  addWallet (wallet: Wallet) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlWallet}`, wallet);
  }

  updateWallet(wallet: Wallet) : Observable<Wallet>{

    if(!wallet.id) throw Error('Error al updatear la wallet');

    return this.http.patch<Wallet>(`${this.urlWallet}/${wallet.id}`, wallet)
  }


}
