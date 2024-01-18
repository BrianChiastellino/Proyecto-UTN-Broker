import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { DataService } from 'src/app/modules/main/services/data.service';
import { WalletService } from 'src/app/modules/main/services/wallet.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges, OnInit {

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;
  @Output() enviarTipoNotificacion = new EventEmitter<number>();

  showForm = true;

  userLoged!: User;
  walletLog!: Wallet;

  cantidad: number = 0;
  pesos!: number;
  valorCompra: number = 0;
  valorFinal: number = 0;

  operacion: number = -1;

  constructor(private wallet: WalletService, private router: Router, public dialogCompra: MatDialog,private snackbar: MatSnackBar, private dataService: DataService) { }

  openCompraDialog() {
    const dialogCompra = this.dialogCompra.open(DialogComponent, {

      panelClass: 'dialog-compra-style',
      data: {
        usuario: this.userLoged,
        coin: this.coinCompra,
        wallet: this.walletLog,
        metodo: this,
        tipoOperacion: 0
      }

    });

    dialogCompra.afterClosed().subscribe((res) => {
      this.operacion = res;
    })

  }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //! aca podemos abrir el dialog
    this.coinCompra = this.coinSelected;
    this.pesos = this.walletLog.fondos;
    this.openCompraDialog();
    this.dialogCompra.afterAllClosed
  }


  toggleForm() {

    this.showForm = !this.showForm;

  }

  calcularPrecio() {
    this.valorCompra = this.cantidad * this.coinSelected.current_price;
  }

  calcularCompra() {
    this.cantidad = this.pesos / this.coinSelected.current_price;
    this.valorFinal = this.cantidad * this.coinSelected.current_price;
  }

  public confirmarCompraDialog(coinCompra: CoinApi, cantCoinFinal: number, fondosFinal: number, dialogWallet: Wallet) {

    if (this.walletLog.fondos > 0 && fondosFinal > 0 && this.walletLog.fondos >= fondosFinal) {

      console.log('Entro a IF')


      const coin: Coin = new Coin();
      coin.id = coinCompra.id.toUpperCase();
      coin.image = coinCompra.image;
      coin.symbol = coinCompra.symbol;
      coin.coinAmount = cantCoinFinal;

      const existe = this.existCoinInWallet(this.coinSelected.id);

      if (existe) {

        console.log('Entro al if existe')

        const index = this.walletLog.coins.findIndex((c) => c.id?.toUpperCase() == this.coinSelected.id.toUpperCase());
        console.log('Index dice:', index);
        console.log('coin:',dialogWallet.coins[index])
        dialogWallet.coins[index].coinAmount += cantCoinFinal;
        // this.walletLog.coins[index].coinAmount += this.cantidad;
      } else {
        dialogWallet.coins.push(coin);
        // this.walletLog.coins.push(coin);
      }

      dialogWallet.fondos -= fondosFinal;
      // this.walletLog.fondos -= fondosFinal;

      this.updateWallet(dialogWallet);
      this.dataService.enviarInformacion(0);


      }else{
        this.dataService.enviarInformacion(1)
      }

      console.log('Termino el if')
    }

    enviarInfoNotificacion(notificacion: number) {
      this.enviarTipoNotificacion.emit(notificacion)
    }









  public confirmarCompra() {
    if (this.walletLog.fondos > 0 && this.valorFinal > 0 && this.walletLog.fondos >= this.valorFinal) {

      const coin: Coin = new Coin();
      coin.id = this.coinSelected.id.toUpperCase();
      coin.image = this.coinSelected.image;
      coin.symbol = this.coinSelected.symbol;
      coin.coinAmount = this.cantidad;

      this.walletLog.fondos <= this.valorFinal

      const existe = this.existCoinInWallet(this.coinSelected.id);

      if (existe) {

        const index = this.walletLog.coins.findIndex((c) => c.id?.toUpperCase() == this.coinSelected.id.toUpperCase());
        this.walletLog.coins[index].coinAmount += this.cantidad;
      } else {
        this.walletLog.coins.push(coin);
      }

      this.walletLog.fondos -= this.valorFinal;

      this.updateWallet(this.walletLog);
      this.toggleForm();

      this.router.navigate(['main/myWallet']);
      // window.location.reload();

    } else {
      alert('No posee los fondos suficientes');
    }
  }

  public existCoinInWallet(idCoin: string): boolean {
    const existe: Coin | undefined = this.walletLog.coins.find((c) => c.id?.toUpperCase() == idCoin.toUpperCase());

    console.log(existe)

    if (existe != undefined) {
      return true;
    }
    return false;

  }



  //! Tuvimos que implementar estos metodos de wallet aca, debido al poco tiempo
  //! Como alumnos sabemos que se tendrian que compartir la wallet con el main mediante emiters y input
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

  goToCreateWallet() {
    this.router.navigate(['main/myWallet'])
  }

















}
