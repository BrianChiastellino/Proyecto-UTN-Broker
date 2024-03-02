import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, CoinApi, User } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins-api',
  templateUrl: './view-coins-api.component.html',
  styleUrls: ['./view-coins-api.component.css']
})

export class ViewCoinsApiComponent implements OnChanges, OnInit {

  @Input() allCoinsApi: Array<CoinApi> = [];
  @Input () allCoinsUsuario: Array <Coin> = [];
  @Output() coinCompra = new EventEmitter<CoinApi>;
  @Output() coinVenta = new EventEmitter<CoinApi>;

  public coinsApiFiltradas: Array<CoinApi> = [];
  public coinBusquedaInput: string = '';
  public usuarioLogueado!: User;
  public existeCoinInWallet : boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.getUsuario();
this.mostrarInfoUsuario();
  }

  //!Se utiliza ngOnChanges para reaccionar a los cambios del @Input que recibe el componente.
  //!Si no se hace este metodo  'coins2' seria null y no funcionaria el filtrado de busqueda.
  ngOnChanges(changes: SimpleChanges): void {
    this.coinsApiFiltradas = [...this.allCoinsApi]
  }

  getUsuario(): void {
    this.usuarioLogueado = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  }

  public mostrarInfoUsuario () {

    // this.allCoinsUsuario.forEach(coinUsuario => {
    //   if(this.allCoinsApi.find(coinApi => coinApi.id == coinUsuario.id)){
    //     console.log(coinUsuario);
    //   }
    // })

    this.allCoinsApi.forEach(coinApi => {
      if(this.allCoinsUsuario.find(coinUser => coinUser.id == coinApi.id)){
        console.log("oli", this.allCoinsApi);
      }
    })

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
