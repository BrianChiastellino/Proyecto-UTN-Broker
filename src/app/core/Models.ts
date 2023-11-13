import { ICoinApi, ICoin, IUser, IWallet, ITransaccion, IComentario } from "./Interfaces";

export class CoinApi implements ICoinApi {

  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  last_updated: string;

  constructor(coinApi?: any) {

    this.id = coinApi == undefined ? '' : coinApi.id;
    this.symbol = coinApi == undefined ? '' : coinApi.symbol;
    this.name = coinApi == undefined ? '' : coinApi.name;
    this.image = coinApi == undefined ? '' : coinApi.image;
    this.current_price = coinApi == undefined ? 0 : coinApi.current_price;
    this.price_change_percentage_24h = coinApi == undefined ? 0 : coinApi.price_change_percentage_24h;
    this.total_volume = coinApi == undefined ? 0 : coinApi.total_volume;
    this.last_updated = coinApi == undefined ? '' : coinApi.last_updated;

  }
}

export class User implements IUser {

  id: number | null = null;
  name: string;
  document: string;
  email: string = '';
  password: string = '';
  isLoged: boolean = false;


  constructor(user?: any) {

    this.id = user == undefined ? null : user.id;
    this.name = user == undefined ? '' : user.name;
    this.document = user == undefined ? '' : user.document;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
    this.isLoged = user == undefined ? false : user.isLoged;

  }

}

export class Wallet implements IWallet {

  id: number | null = 0;
  idUser: number | null;
  fondos: number;
  coins: Coin[];

  constructor(wallet?: any) {

    this.id = wallet == undefined ? 0 : wallet.id;
    this.idUser = wallet == undefined ? null : wallet.idUser;
    this.fondos = wallet == undefined ? 0 : wallet.fondos;
    this.coins = wallet == undefined ? [] : wallet.coins;

  }
}

export class Coin implements ICoin {

  id: string | null;
  coinAmount: number;

  constructor(coin?: any) {
    this.id = coin == undefined ? null : coin.id;
    this.coinAmount = coin == undefined ? null : coin.coinAmount;
  }

}

export class Transaccion implements ITransaccion {

  id: number | null = 0;
  idUser: number | null;
  idCoin: string | null;
  coinAmount: number;
  tipoTransaccion: string; //Si es venta o compra.
  fecha: string;

  constructor(transaccion?: any) {

    this.id = transaccion == undefined ? 0 : transaccion.id;
    this.idUser = transaccion == undefined ? null : transaccion.idUser;
    this.idCoin = transaccion == undefined ? null : transaccion.idCoin;
    this.coinAmount = transaccion == undefined ? 0 : transaccion.coinAmount;
    this.tipoTransaccion = transaccion == undefined ? '' : transaccion.tipoTransaccion;
    this.fecha = transaccion == undefined ? '' : transaccion.fechaCompra;

  }

}

export class Comentario implements IComentario{
  id: number | null = null;
  detalle: string = '';
  fecha: string = '';

  constructor(comentario?: IComentario) {
    if (comentario) {
      this.id = comentario.id !== undefined ? comentario.id : null;
      this.detalle = comentario.detalle !== undefined ? comentario.detalle : '';
      this.fecha = comentario.fecha !== undefined ? comentario.fecha : '';
    }

    }


}
