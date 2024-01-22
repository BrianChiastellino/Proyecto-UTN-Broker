import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, User, Wallet } from 'src/app/core/Models';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  onSubmit() {
    throw new Error('Method not implemented.');
  }


  userLoged!: User;
  allWallets: Array<Wallet> = []
  currentWallet!: Wallet
  existWallet: boolean = false;
  monto: string = '';
  montoReal: number = 0;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
  }

  public createWallet(): void {
    const wall = new Wallet();
    wall.idUser = this.userLoged.id;
    this.addWallet(wall);
    window.location.reload();
    //! Tuve que poner esta linea de codigo para recargar cuando un usuario se crea una wallet
  }
  


  public depositarFondos() {

    // if(!isNaN(parseFloat(this.monto))){
    //   this.montoReal = parseFloat(this.monto) || 0;
    // }



    if (!isNaN(parseFloat(this.monto))) {

      this.montoReal = parseFloat(this.monto);

      try {


        if (this.currentWallet != undefined && this.montoReal >= 50) {
          this.currentWallet.fondos! += this.montoReal;
          this.updateWallet(this.currentWallet);
        } else {
          throw alert('Deposito minimo USD50')

        }
      } catch (error) {
        console.error(error)
      }




    }


  }

  public retirarFondos() {

    const { fondos } = this.currentWallet;

    if (!isNaN(parseFloat(this.monto))) {
      this.montoReal = parseFloat(this.monto);

      try {

        if (this.currentWallet != undefined && fondos! >= this.montoReal) {
          this.currentWallet.fondos! -= this.montoReal;
          this.updateWallet(this.currentWallet);
        } else {
          throw alert('Fondos insuficientes');
        }
      }
      catch (error) {
        console.error('Error al retirar fondos', error)
      }
    }
  }

  public addWallet(wallet: Wallet) {
    this.walletService.addWalletFromService(wallet);
  }

  public async getWallets() {

    try {
      this.allWallets = ((await this.walletService.getAllWalletFromService()).slice());

      this.currentWallet = this.allWallets.find((w) => w.idUser == this.userLoged.id)!

      if (this.currentWallet == undefined) {
        this.createWallet();
      }

      this.existWallet = true;

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

  // getWallet(): Wallet{
  //   return this.currentWallet;
  // }


}
