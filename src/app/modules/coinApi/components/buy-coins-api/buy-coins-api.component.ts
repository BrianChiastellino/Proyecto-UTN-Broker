import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { WalletService } from 'src/app/modules/main/services/wallet.service';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges, OnInit {

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;
  // @Input() walledLogue!: Wallet;

  showForm = true;

  userLoged!: User;
  walletLog!: Wallet;

  cantidad: number = 0;
  pesos!: number;
  valorCompra: number = 0;
  valorCompraPesos: number = 0;

  constructor(private wallet: WalletService) { }


  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Desde buy', this.coinSelected);
    this.coinCompra = this.coinSelected;
    console.log('Desde el this', this.coinCompra);
    console.log('los pesos pa', this.pesos);
    console.log('ngOninit', this.userLoged);
    this.pesos = this.walletLog.fondos;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  calcularPrecio() {
    this.valorCompra = this.cantidad * this.coinSelected.current_price;
  }

  calcularCompra() {
    this.cantidad = this.pesos / this.coinSelected.current_price;
    this.valorCompraPesos = this.cantidad * this.coinSelected.current_price;
  }


  public confirmarCompra() {

    const coin: Coin = new Coin();
    coin.id = this.coinSelected.id.toUpperCase();
    coin.coinAmount = this.cantidad;

    this.walletLog.fondos < this.valorCompraPesos

    const existe = this.existCoinInWallet(this.coinSelected.id);

    if (existe) {

      const index = this.walletLog.coins.findIndex((c) => c.id == this.coinSelected.id);
      this.walletLog.coins[index].coinAmount += this.cantidad;
    } else {
      this.walletLog.coins.push(coin);
    }

    this.walletLog.fondos -= this.valorCompraPesos;
    // console.log(this.walletLog);
    this.updateWallet(this.walletLog);

  }

  public existCoinInWallet(idCoin: string): boolean {
    const existe: Coin | undefined = this.walletLog.coins.find((c) => c.id == idCoin);

    if (existe != undefined) {
      return true;
    }
    return false;
  }



  //! Tuvimos que implementar estos metodos de wallet aca, debido  que la wallet llegaba undefined
  //! Optamos dejarlo asi debido al poco tiempo que tenemos.

  public async getWallets() {

    let allWallets: Array<Wallet> = [];

    try {
      allWallets = ((await this.wallet.getAllWalletFromService()).slice());
      console.log(allWallets);

      this.walletLog = allWallets.find((w) => w.idUser == this.userLoged.id)!

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
