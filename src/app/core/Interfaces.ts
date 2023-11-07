
export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  last_updated: string;
}

export interface IUser {
  id: number | null;
  document: string;
  email: string;
  password: string;
  isLoged: boolean;
  myWallet: IWallet;

}

export interface IWallet {

  id: number | null;
  myCoins: IMyCoins[];

}

export interface IMyCoins {

  idCoin: string | null;
  amount: number;

}
