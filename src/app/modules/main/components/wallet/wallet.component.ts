import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
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


  public userLoged!: User;
  public allWallets: Array<Wallet> = []
  public currentWallet!: Wallet
  public existWallet: boolean = false;
  public monto: string = '';
  public montoReal: number = 0;
  public errorDepositar: boolean = false;
  public errorRetirar: boolean = false;
  public coinsApiFiltradas: Array<Coin> = []
  public coinBusquedaInput: string = '';

  constructor(private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
    this.ordenarCoins();



  }






  public createWallet(): void {
    const wall = new Wallet();
    wall.idUser = this.userLoged.id;
    this.addWallet(wall);
    this.getWallets();
    //! Tuve que poner esta linea de codigo para recargar cuando un usuario se crea una wallet
  }

  quitarLetras(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  quitarNumeros(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  }

  ordenarCoins(): void {
    this.currentWallet.coins.sort((a, b) => {
      // Convertir las fechas a objetos Date
      let dateA = this.parseDateString(a.fecha);
      let dateB = this.parseDateString(b.fecha);

      // Comparar las fechas en orden descendente
      return dateB.getTime() - dateA.getTime();
    });
  }

  parseDateString(dateString: string): Date {

    let parts = dateString.split(', ');
    let datePart = parts[0].split('/');
    let timePart = parts[1].split(':');


    let year = parseInt(datePart[2]);
    let month = parseInt(datePart[1]) - 1;
    let day = parseInt(datePart[0]);
    let hours = parseInt(timePart[0]);
    let minutes = parseInt(timePart[1]);
    let seconds = parseInt(timePart[2]);

    return new Date(year, month, day, hours, minutes, seconds);
  }

  public buscarCoin(): void {
    this.coinsApiFiltradas = this.currentWallet.coins.filter((c) =>
      c.id?.toLowerCase().includes(this.coinBusquedaInput.toLowerCase()) ||
      c.symbol.toLowerCase().includes(this.coinBusquedaInput.toLowerCase())
    );
  }


  public depositarFondos() {
    if (!isNaN(parseFloat(this.monto))) {

      this.montoReal = parseFloat(this.monto);

      try {


        if (this.currentWallet != undefined && this.montoReal >= 50) {
          this.currentWallet.fondos! += this.montoReal;
          this.updateWallet(this.currentWallet);
        } else {
          this.errorDepositar = true;

          setTimeout(() => {
            this.errorDepositar = false;
          }, 3000);

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

        if (this.currentWallet != undefined && fondos! >= this.montoReal && this.montoReal >= 100) {
          this.currentWallet.fondos! -= this.montoReal;
          this.updateWallet(this.currentWallet);
        } else {
          this.errorRetirar = true;


          setTimeout(() => {
            this.errorRetirar = false;
          }, 2500);

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
      this.ordenarCoins();
      this.coinsApiFiltradas = this.currentWallet.coins.slice();


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


}
