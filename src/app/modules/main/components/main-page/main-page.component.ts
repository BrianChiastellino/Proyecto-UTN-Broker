import { JsonTransaccionService } from './../../../../core/services/json-transaccion.service';
import { CoinApiService } from 'src/app/modules/coinApi/services/coin-api.service';
import { Coin, CoinApi, Transaccion, User, Wallet } from './../../../../core/Models';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

import { WalletService } from '../../services/wallet.service';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', './toast-noti.component.css'],
})

//!todo: ENVIAR TODA LA INFO AL MAIN PARA QUE EL MAIN USE LOS SERVICIOS Y GUARDE CON EL BACK
//!todo: Una vez que sabemos que coins tiene el usuario pintar de color rojo las que no tiene para que seap que no puede vender.



export class MainPageComponent implements OnInit {


  public allCoinsApi: Array<CoinApi> = []
  public allCoinsUsuario: Array<Coin> = [];
  public usuarioLogueado!: User;
  public notificacionToast: boolean = false;
  public coinSeleccionada!: CoinApi;
  public usuarioWallet!: Wallet;
  public tipoNotificacionToast: number = -1;

  public OPERACION_COMPRA: number = 0;
  public OPERACION_VENTA: number = 1;
  public OPERACION_EXITOSA: number = 0;
  public OPERACION_ERROR: number = 1;
  public OPERACION_INFO: number = 2;

  constructor(private coinApiService: CoinApiService,
    private router: Router,
    public walletService: WalletService,
    public matDialog: MatDialog,
    public transaccion: TransaccionService) {


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.notificacionToast = false;
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

    if (this.usuarioWallet && this.usuarioWallet.fondos > 0) {
      this.coinSeleccionada = coinCompra;

      this.matDialog.open(DialogComponent, {
        panelClass: 'dialog-compra-style',
        data: {
          usuario: this.usuarioLogueado,
          coin: coinCompra,
          wallet: this.usuarioWallet,
          metodo: this,
          tipoOperacion: this.OPERACION_COMPRA,
        }
      });

    } else {
      this.setearTipoNotificacionToast(this.OPERACION_INFO);
      this.abrirNotificacionToast();
    }
  }

  public abrirDialogVenta(coinVenta: CoinApi): void {
    this.coinSeleccionada = coinVenta;

    this.matDialog.open(DialogComponent, {
      panelClass: 'dialog-compra-style',

      data: {
        usuario: this.usuarioLogueado,
        coin: coinVenta,
        wallet: this.usuarioWallet,
        metodoVenta: this,
        tipoOperacion: this.OPERACION_VENTA
      }
    });


  }

  public confirmarCompraDialog(coinCompra: CoinApi, cantCoinFinal: number, fondosFinal: number, dialogWallet: Wallet) {

    if (this.usuarioWallet.fondos > 0 && fondosFinal > 0 && this.usuarioWallet.fondos >= fondosFinal) {


      const coin: Coin = new Coin();
      coin.id = coinCompra.id.toUpperCase();
      coin.image = coinCompra.image;
      coin.symbol = coinCompra.symbol;
      coin.coinAmount = cantCoinFinal;

      const existe = this.existCoinInWallet(coinCompra.id);

      if (existe) {

        const index = this.usuarioWallet.coins.findIndex((c) => c.id?.toUpperCase() == coinCompra.id.toUpperCase());

        dialogWallet.coins[index].coinAmount += cantCoinFinal;
      } else {
        dialogWallet.coins.push(coin);
      }

      dialogWallet.fondos -= fondosFinal;

      this.updateWallet(dialogWallet);
      this.setearTipoNotificacionToast(this.OPERACION_EXITOSA);
      this.crearTransaccion(this.OPERACION_COMPRA,cantCoinFinal);

    } else {
      this.setearTipoNotificacionToast(this.OPERACION_ERROR);
    }

    this.getUsuarioWallet();
    this.abrirNotificacionToast();

  }

  setearTipoNotificacionToast(tipoToast: number) {
    this.tipoNotificacionToast = tipoToast;
  }

  abrirNotificacionToast() {
    this.notificacionToast = true;

    setTimeout(() => {
      this.cerrarNotificacionToast();
    }, 3500);

  }

  cerrarNotificacionToast() {
    this.notificacionToast = false;
    setTimeout(() => {
      this.tipoNotificacionToast = -1;
    }, 120);
  }

  confirmarVentaDialog(wallet: Wallet, operacion: number, coinAmount: number) {

    if (operacion == 0) {
      this.updateWallet(wallet);
      this.crearTransaccion(this.OPERACION_VENTA, coinAmount);
    }

    this.setearTipoNotificacionToast(operacion);
    this.getUsuarioWallet();
    this.abrirNotificacionToast();

  }

  public actualizarCoinUsuario(): void {
    this.allCoinsUsuario = this.usuarioWallet.coins.slice();
  }
  //! TRANSACCION METODOS

  public crearTransaccion(tipoOperacion: number, coinAmount: number) {

    let transaccion = new Transaccion();
    transaccion.idUser = this.usuarioLogueado.id;
    transaccion.idCoin = this.coinSeleccionada.id;
    transaccion.coinAmount = coinAmount;
    transaccion.tipoTransaccion = tipoOperacion;
    transaccion.fecha = new Date().toLocaleString();

    this.guardarTrasaccion(transaccion);

  }

  public guardarTrasaccion (transaccion: Transaccion) {
    this.transaccion.addTransaccionFromService(transaccion);
  }


  //! WALLET METODOS

  public async getUsuarioWallet() {

    let allWallets: Array<Wallet> = [];

    try {
      allWallets = ((await this.walletService.getAllWalletFromService()).slice());

      this.usuarioWallet = allWallets.find((w) => w.idUser == this.usuarioLogueado.id)!
      this.actualizarCoinUsuario();
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
