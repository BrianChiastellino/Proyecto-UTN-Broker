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
export interface IUser{
  id: number | null;
  email: string;
  password: string;
}
