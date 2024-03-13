import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, CoinApi, User } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins-api',
  templateUrl: './view-coins-api.component.html',
  styleUrls: ['./view-coins-api.component.css']
})

export class ViewCoinsApiComponent implements OnChanges, OnInit {

  @Input() allCoinsApi: Array<CoinApi> = [];
  @Input() operacionCoinCompraVenta!: boolean;
  @Input() allCoinsUsuario: Array<Coin> = [];
  @Output() coinCompra = new EventEmitter<CoinApi>;
  @Output() coinVenta = new EventEmitter<CoinApi>;

  public coinsApiFiltradas: Array<CoinApi> = [];
  public coinBusquedaInput: string = '';
  public usuarioLogueado!: User;
  public existeCoinInWallet: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.getUsuario();

  }

  //!Se utiliza ngOnChanges para reaccionar a los cambios del @Input que recibe el componente.
  //!Si no se hace este metodo  'coins2' seria null y no funcionaria el filtrado de busqueda.
  ngOnChanges(changes: SimpleChanges): void {
    this.coinsApiFiltradas = [...this.allCoinsApi]

  }

  getUsuario(): void {
    this.usuarioLogueado = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  }

  public filtrarCoinsUsuario(coin: CoinApi): boolean {

    const existe = this.allCoinsUsuario.find(coinUser => coinUser.id?.toUpperCase() == coin.id.toUpperCase());


    if (existe) {
      return true;
    } else {
      return false;
    }

  }


  public coinToBuy(coin: CoinApi) {
    this.coinCompra.emit(coin);
  }

  public coinToSell(coin: CoinApi) {
    this.coinVenta.emit(coin);
  }


  public buscarCoin(): void {
    this.coinsApiFiltradas = this.allCoinsApi.filter((c) =>
      c.name.toLowerCase().includes(this.coinBusquedaInput.toLowerCase()) ||
      c.symbol.toLowerCase().includes(this.coinBusquedaInput.toLowerCase())
    );
  }


}
