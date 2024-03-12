import { Component, EventEmitter, Inject, OnInit, Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Output() tipoNotificacion = new EventEmitter<number>();
  public myCoin!: number;
  public tipoMoneda: number = 0;
  public inputMoneda: string = '';

  public botonActivo: number | null = 0; // Variable para rastrear qué botón está activado



  constructor(public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)


    //! ATRIBUTOS DEL DIALOG

    public data: {

      titulo: string,
      usuario: User,
      coin: CoinApi,
      wallet: Wallet,


      metodo: any,
      compraFondos: number,
      cantidadCoinFinal: number,

      metodoVenta: any,
      inputDolares: number,
      dolaresAVender: number,
      ganancia: number,


      tipoOperacion: number,
      tipoNotificacion: number,
      precioCripto: number

      operacion: number,


    }) { }

  ngOnInit(): void {
    if (this.data.tipoOperacion == 1) {
      this.myCoin = this.data.wallet.coins[this.getIndexCoin()].coinAmount;
    }
  }

  activarBoton(indice: number): void {
    this.botonActivo = indice; // Establece el botón actualmente activo
  }






  //! FUNCIONES DEL DIALOG
  cerrar(notificacion: number) {
    this.dialog.close(notificacion);

  }

  //! FUNCIONES COMPRA
  calcularPrecio() {




    if (!isNaN(parseFloat(this.inputMoneda))) {

      this.data.compraFondos = parseFloat(this.inputMoneda)

      if (this.tipoMoneda == 0) {
        this.data.cantidadCoinFinal = this.data.compraFondos / this.data.coin.current_price;
      } else if (this.tipoMoneda == 1) {
        this.data.cantidadCoinFinal = this.data.compraFondos * this.data.coin.current_price;
      }
    }
  }

  confirmarCompra() {


    if (this.tipoMoneda == 0) {
      this.data.metodo.confirmarCompraDialog(this.data.coin, this.data.cantidadCoinFinal, this.data.compraFondos, this.data.wallet);
      this.cerrar(0);
    } else if (this.tipoMoneda == 1) {
      this.data.metodo.confirmarCompraDialog(this.data.coin, this.data.compraFondos, this.data.cantidadCoinFinal, this.data.wallet);
      this.cerrar(0);

    }



  }




  //! Calculamos la venta, deposita dolares y se obtiene el valor en criptomonedas.
  calcularPrecioVenta() {



    if (!isNaN(parseFloat(this.inputMoneda))) {
      this.data.inputDolares = parseFloat(this.inputMoneda);

      if (this.tipoMoneda == 0) {
        if (this.data.inputDolares > 0) {
          this.data.precioCripto = this.data.inputDolares / this.data.coin.current_price;
        }
      } else if (this.tipoMoneda == 1) {
        this.data.precioCripto = this.data.inputDolares;
      }



    }
  }

  validarFondos(): boolean {



    const index = this.getIndexCoin();


    if (this.data.wallet.coins[index].coinAmount > 0 && index != -1 && this.data.precioCripto <= this.data.wallet.coins[index].coinAmount) {
      return true;
    }

    return false;
  }

  //! Tenemos la coin de la wallet
  getIndexCoin(): number {
    const idToSell = this.data.coin.id;
    return this.data.wallet.coins.findIndex(c => c.id?.toUpperCase() == idToSell.toUpperCase())
  }

  setearWallet() {
    const coinIndex = this.getIndexCoin();


    if (coinIndex !== -1) {
      const coin = this.data.wallet.coins[coinIndex];
      coin.coinAmount -= this.data.precioCripto;

      if (coin.coinAmount <= 0) {
        this.data.wallet.coins.splice(coinIndex, 1);
      }
    }

    if (this.tipoMoneda == 0) {
      this.data.wallet.fondos += this.data.inputDolares;
    } else if (this.tipoMoneda == 1) {
      this.data.wallet.fondos += this.data.inputDolares * this.data.coin.current_price;
    }

  }

  confirmarVenta() {


    if (this.validarFondos()) {
      this.setearWallet();
      this.data.metodoVenta.confirmarVentaDialog(this.data.wallet, 0, this.data.precioCripto);
      this.cerrar(0);
    } else {
      this.data.metodoVenta.confirmarVentaDialog(this.data.wallet, 1, this.data.precioCripto);
      this.cerrar(0);
    }
  }
}
