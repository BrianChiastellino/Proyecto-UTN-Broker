import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Coin, User, Wallet } from 'src/app/core/Models';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  @Output () walledLog = new EventEmitter<Wallet>;


onSubmit() {
throw new Error('Method not implemented.');
}


  userLoged!: User;
  allWallets: Array<Wallet> = []
  currentWallet!: Wallet
  existWallet: boolean = false;
  monto: number = 0;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
  }

  public createWallet(): void {
    const wall = new Wallet();
    wall.idUser = this.userLoged.id;
    this.addWallet(wall);
    this.existeWallet();
  }

  public getCurrentWallet () {
    this.currentWallet = this.allWallets.find((w) => w.idUser == this.userLoged.id)!
    sessionStorage.setItem('wallet', JSON.stringify(this.currentWallet));



  }
  public walletLogs (wallet: Wallet){
    console.log('Desde wallet emit', wallet);
    this.walledLog.emit(wallet);

  }

  public existeWallet () {
    this.getCurrentWallet();
    this.currentWallet != undefined ? this.existWallet = true : this.existWallet = false;
  }

  public depositarFondos() {

    try {

      if (this.currentWallet != undefined && this.monto >= 100 ) {
        console.log(this.currentWallet)
        this.currentWallet.fondos! += this.monto;
        // const coin: Coin = new Coin();
        // coin.coinAmount = 10;
        // coin.id = 'bitcoin';
        // this.currentWallet.coins.push()
        this.updateWallet(this.currentWallet);
      }else{
        throw alert('Deposito minimo USD100')

      }
    } catch (error) {
      console.error(error)
    }

  }

  public retirarFondos (){

    const {fondos} = this.currentWallet;

    console.log(fondos);

    try{

      if(this.currentWallet != undefined && fondos! >= this.monto){
        this.currentWallet.fondos! -= this.monto;
        this.updateWallet(this.currentWallet);
      }else{
        throw alert('Fondos insuficientes');
      }
    }
    catch(error){
      console.error('Error al retirar fondos', error)
    }
  }

  public addWallet(wallet: Wallet) {
    this.walletService.addWalletFromService(wallet);
  }

  public async getWallets() {

    try {
      this.allWallets = ((await this.walletService.getAllWalletFromService()).slice());
      console.log(this.allWallets);


      this.getCurrentWallet();
      this.existeWallet();
    } catch (error) {
      console.error('Error al intentar obtener las wallets', error);
    }
  }

  public async updateWallet(wallet: Wallet) {
    try {
      await this.walletService.updateWalletFromService(wallet);
    }
    catch (error) {
      console.error('Error al intentar actualizar la wallet', error);
    }
  }

  getWallet(): Wallet{
    return this.currentWallet;
  }


}
