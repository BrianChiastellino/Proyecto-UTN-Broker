
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

  id: number | null;
  idUser: number | null;
  fondos: number;
  coins: ICoin[];

}

export interface ICoin {

  symbol: string;
  id: string | null;
  coinAmount: number | null;
  image: string;

}

export interface ITransaccion {

  id: number | null;
  idUser: number | null;
  idCoin: string | null;
  coinAmount: number;
  tipoTransaccion: number;
  fecha: string;

}

export interface IComentario {
  id: number | null;
  detalle: string;
  fecha: string;
}
