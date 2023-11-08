
export interface ICoinApi {
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
  name: string;
  document: string;
  email: string;
  password: string;
  isLoged: boolean;

}

export interface IWallet {

  idWallet: number | null;
  idUser: number | null;
  coins: ICoin[];

}

export interface ICoin {

  idCoin: string | null;
  coinAmount: number | null;

}

export interface ITransaccion {

  idUser: number | null;
  idCoin: string | null;
  coinAmount: number;
  fechaCompra: string;


}
