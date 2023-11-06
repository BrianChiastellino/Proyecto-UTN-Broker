import { ICoin, IUser } from "./Interfaces";

export class Coin implements ICoin {

  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  last_updated: string;

  constructor(coin?: any){

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

export class User implements IUser{

  id: number | null = null;
  name: string;
  document: string;
  email: string = '';
  password: string = '';
  myCoins: Coin[] = [];

  constructor(user?:any){

    this.id = user == undefined ? null : user.id;
    this.name = user == undefined ? '' : user.name;
    this.document = user == undefined ? '' : user.document;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
    this.myCoins = user == undefined ? [] : user.myCoins.slice()
  }

}
