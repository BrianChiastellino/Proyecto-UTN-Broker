import { CoinApiService } from 'src/app/modules/coinApi/services/coin-api.service';
import { Coin, CoinApi, User, Wallet } from './../../../../core/Models';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', './toast-noti.component.css'],
})

//!todo: ENVIAR TODA LA INFO AL MAIN PARA QUE EL MAIN USE LOS SERVICIOS Y GUARDE CON EL BACK
//!todo: Una vez que sabemos que coins tiene el usuario pintar de color rojo las que no tiene para que seap que no puede vender.



export class MainPageComponent implements OnInit {

  public allCoinsApi: Array<CoinApi> = []
  public usuarioLogueado!: User;
  public abrirNotificacionToast: boolean = false;
  public coinCompra!: CoinApi;
  public coinVenta!: CoinApi;
  public usuarioWallet!: Wallet;
  public tipoNotificacionToast: number = -1;
  public allCoinsUsuario: Array<Coin> = [];

  public OPERACION_COMPRA: number = 0;
  public OPERACION_VENTA: number = 1;
  public OPERACION_EXITOSA: number = 0;
  public OPERACION_ERROR: number = 1;

  constructor(private coinApiService: CoinApiService,
    private router: Router,
    public walletService: WalletService,
    public matDialog: MatDialog) {


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.abrirNotificacionToast = false;
        this.tipoNotificacionToast = -1;
      }
    });

  }

  ngOnInit(): void {
    this.usuarioLogueado = this.getUsuario();
    this.getAllCoinsApi();
    this.getUsuarioWallet();
  }


  public getAllCoinsApi(): void {
    this.coinApiService.getAllGoins().then((c) => this.allCoinsApi = c.slice());
  }

  getUsuario(): User {
    return new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  }

  public abrirDialogCompra(coinCompra: CoinApi): void {

    this.coinCompra = coinCompra;

    const dialog = this.matDialog.open(DialogComponent, {
      panelClass: 'dialog-compra-style',
      data: {
        usuario: this.usuarioLogueado,
        coin: coinCompra,
        wallet: this.usuarioWallet,
        metodo: this,
        tipoOperacion: this.OPERACION_COMPRA,
      }
    });

    dialog.afterClosed().subscribe((res) => {

    })
  }

  public abrirDialogVenta(coinVenta: CoinApi): void {
    this.coinVenta = coinVenta;

    const dialog = this.matDialog.open(DialogComponent, {
      panelClass: 'dialog-compra-style',

      data: {
        usuario: this.usuarioLogueado,
        coin: coinVenta,
        wallet: this.usuarioWallet,
        metodoVenta: this,
        tipoOperacion: this.OPERACION_VENTA
      }
    });

    dialog.afterClosed().subscribe((res) => {

    })
  }

  public confirmarCompraDialog(coinCompra: CoinApi, cantCoinFinal: number, fondosFinal: number, dialogWallet: Wallet) {

    if (this.usuarioWallet.fondos > 0 && fondosFinal > 0 && this.usuarioWallet.fondos >= fondosFinal) {


      const coin: Coin = new Coin();
      coin.id = coinCompra.id.toUpperCase();
      coin.image = coinCompra.image;
      coin.symbol = coinCompra.symbol;
      coin.coinAmount = cantCoinFinal;

      const existe = this.existCoinInWallet(this.coinCompra.id);

      if (existe) {

        const index = this.usuarioWallet.coins.findIndex((c) => c.id?.toUpperCase() == this.coinCompra.id.toUpperCase());

        dialogWallet.coins[index].coinAmount += cantCoinFinal;
        // this.walletLog.coins[index].coinAmount += this.cantidad;
      } else {
        dialogWallet.coins.push(coin);
        // this.walletLog.coins.push(coin);
      }

      dialogWallet.fondos -= fondosFinal;
      // this.walletLog.fondos -= fondosFinal;

      this.updateWallet(dialogWallet);
      this.tipoNotificacionToast = this.OPERACION_EXITOSA;

    } else {
      this.tipoNotificacionToast = this.OPERACION_ERROR;
    }

    this.abrirNotificacionToast = true;

    setTimeout(() => {
      this.cerrarNotificacion();
    }, 3500);


  }

  cerrarNotificacion() {
    this.abrirNotificacionToast = false;
    setTimeout(() => {
      this.tipoNotificacionToast = -1;
    }, 120);
  }

  confirmarVentaDialog(wallet: Wallet, operacion: number) {

    if (operacion == 0) {
      this.updateWallet(wallet);
      this.tipoNotificacionToast = operacion;
    } else if (operacion == 1) {
      this.tipoNotificacionToast = operacion;
    }

    this.abrirNotificacionToast = true;

    setTimeout(() => {
      this.cerrarNotificacion();
    }, 3500);
  }

  public getCoinsUsuario(): void {
    this.allCoinsUsuario = this.usuarioWallet.coins.slice();
  }


  //! WALLET METODOS
  //todo probar que pasa si el usuario no tiene wallet, si carga la pagina o algo.



  public async getUsuarioWallet() {

    let allWallets: Array<Wallet> = [];

    try {
      allWallets = ((await this.walletService.getAllWalletFromService()).slice());

      this.usuarioWallet = allWallets.find((w) => w.idUser == this.usuarioLogueado.id)!
      this.getCoinsUsuario()
    } catch (error) {
      console.error('Error al intentar obtener las wallets', error);
    }
  }

  public existCoinInWallet(idCoin: string): boolean {
    const existe: Coin | undefined = this.usuarioWallet.coins.find((c) => c.id?.toUpperCase() == idCoin.toUpperCase());

    if (existe != undefined) {
      return true;
    }
    return false;

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
