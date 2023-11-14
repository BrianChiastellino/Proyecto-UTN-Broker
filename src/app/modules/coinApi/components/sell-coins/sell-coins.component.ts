import { Component, Input, OnInit } from '@angular/core';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { WalletService } from 'src/app/modules/main/services/wallet.service';

@Component({
  selector: 'app-sell-coins',
  templateUrl: './sell-coins.component.html',
  styleUrls: ['./sell-coins.component.css']
})
export class SellCoinsComponent implements OnInit {

  @Input () coinToSell!: CoinApi;
  currentWallet!: Wallet;
  currentUser!: User;

  constructor(private wallet: WalletService){}

  ngOnInit(): void {
    this.currentUser = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
  }

  public confirmarVenta (){

    //todo: Aca toda la magia del Tom
    /*
    - Sbaer si la coin que quiero vender la tengo en la wallet, usando la funcion de abajo
    - Si el usuario quiere vender 100 dolares de bitcoin
    - Los fondos auemtan 100 dolares
    - el coin.amount disminuye en base a esos 100 dolares
    - Updatear la wallet

    */

    console.log(this.currentWallet);
    console.log(this.currentUser);
    console.log(this.coinToSell);

  }

  public existCoinInWallet(idCoin: string): boolean {
    const existe: Coin | undefined = this.currentWallet.coins.find((c) => c.id == idCoin);

    if (existe != undefined) {
      return true;
    }
    return false;
  }

  public async getWallets() {

    let allWallets: Array<Wallet> = [];

    try {
      allWallets = ((await this.wallet.getAllWalletFromService()).slice());
      console.log(allWallets);

      this.currentWallet = allWallets.find((w) => w.idUser == this.currentUser.id)!

    } catch (error) {
      console.error('Error al intentar obtener las wallets', error);
    }
  }

  public async updateWallet(wallet: Wallet) {
    try {
      await this.wallet.updateWalletFromService(wallet);
    }
    catch (error) {
      console.error('Error al intentar actualizar la wallet', error);
    }
  }





}
