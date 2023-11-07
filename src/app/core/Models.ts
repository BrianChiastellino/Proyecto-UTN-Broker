import { flush } from "@angular/core/testing";
import { ICoin, IMyCoins, IUser, IWallet } from "./Interfaces";

export class Coin implements ICoin {

  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  last_updated: string;

  constructor(coin?: any) {

    this.id = coin == undefined ? '' : coin.id;
    this.symbol = coin == undefined ? '' : coin.symbol;
    this.name = coin == undefined ? '' : coin.name;
    this.image = coin == undefined ? '' : coin.image;
    this.current_price = coin == undefined ? 0 : coin.current_price;
    this.price_change_percentage_24h = coin == undefined ? 0 : coin.price_change_percentage_24h;
    this.total_volume = coin == undefined ? 0 : coin.total_volume;
    this.last_updated = coin == undefined ? '' : coin.last_updated;

  }
}

export class User implements IUser {

  id: number | null = null;
  name: string;
  document: string;
  email: string = '';
  password: string = '';
  isLoged: boolean = false;
  myWallet: Wallet;


  constructor(user?: any) {

    this.id = user == undefined ? null : user.id;
    this.name = user == undefined ? '' : user.name;
    this.document = user == undefined ? '' : user.document;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
    this.isLoged = user == undefined ? false : user.isLoged;
    this.myWallet = user == undefined ? new Wallet() : user.myWallet;

  }

}

export class Wallet implements IWallet {

  static lastId: number = 0;
  id: number | null;
  myCoins: MyCoins[];

  constructor(wallet?: any) {

    //todo: Reparar el id de la wallet debido a que cuando se reinicia el servidor, se reinician los id de la instancia.
    //todo: Reparar el idUser de la wallet debido a que el autoincremental te lo hace el mismo json server
    //todo: Preguntar a Agus si sacamos el id si total ya queda dentro del usuario O DIRECTAMENTE HACER MYCOINS.
    this.id = wallet == undefined ? Wallet.lastId : wallet.id;
    this.myCoins = wallet == undefined ? new MyCoins() : wallet.myCoins.slice();
    Wallet.lastId++;
  }
}

export class MyCoins implements IMyCoins {

  idCoin: string | null;
  amount: number;

  constructor(myCoins?: any) {
    this.idCoin = myCoins == undefined ? '' : myCoins.idCoin;
    this.amount = myCoins == undefined ? 0 : myCoins.amount;
  }
}
