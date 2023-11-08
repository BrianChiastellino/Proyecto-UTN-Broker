import {ICoinApi, ICoin, IUser, IWallet, ITransaccion } from "./Interfaces";

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

  idWallet: number | null;
  idUser: number | null;
  coins: Coin[];

  constructor(wallet?: any) {

    this.idWallet = wallet == undefined ? null : wallet.idWallet;
    this.idUser = wallet == undefined ? null : wallet.idUser;
    this.coins = wallet == undefined ? [] : wallet.myCoins.slice();

  }
}

export class Coin implements ICoin {

  idCoin: string | null;
  coinAmount: number;

  constructor(coin?: any) {
    this.idCoin = coin == undefined ? null : coin.idCoin;
    this.coinAmount = coin == undefined ? null : coin.coinAmount;
  }

}

export class Transaccion implements ITransaccion{

  idUser: number | null;
  idCoin: string | null;
  coinAmount: number;
  fechaCompra: string;

  constructor(transaccion?: any) {

    this.idUser = transaccion == undefined ? null : transaccion.idUser;
    this.idCoin = transaccion == undefined ? null : transaccion.idCoin;
    this.coinAmount = transaccion == undefined ? 0 : transaccion.coinAmount;
    this.fechaCompra = transaccion == undefined ? '' : transaccion.fechaCompra;

  }

}
