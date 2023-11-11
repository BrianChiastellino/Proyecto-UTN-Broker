import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Wallet } from 'src/app/core/Models';
import { JsonWalletService } from 'src/app/core/services/json-wallet.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private wallet: JsonWalletService) { }




  public async getAllWalletFromService() {

    try {

      let response = this.wallet.getAllWallets();

      const data = await lastValueFrom(response);
      console.log('Conectado con wallets');
      return data.map((w:any) => new Wallet(w));

    } catch (error) {
      console.error('Error al querer obtener todas las wallets', error)
      return []
    }

  }

  public addWalletFromService(wallet: Wallet) {

    this.wallet.addWallet(wallet).subscribe({
      next: () => {
        alert('La wallet se agrego')
      },
      error: () => {
        alert('Erro al añadir wallet')
      }
    })
  }

  public async updateWalletFromService(wallet: Wallet): Promise<Wallet | null> {

    let resp: Wallet | null = null;

    try {
      let apiResponse = this.wallet.updateWallet(wallet);

      resp = await lastValueFrom(apiResponse);

    } catch (error) {
      console.error('Erro al updatear la wallet');
    }

    return resp;

  }
}
