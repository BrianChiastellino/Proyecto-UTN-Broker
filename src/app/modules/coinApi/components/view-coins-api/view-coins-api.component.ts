import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CoinApi } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins-api',
  templateUrl: './view-coins-api.component.html',
  styleUrls: ['./view-coins-api.component.css']
})

export class ViewCoinsApiComponent implements OnChanges {

  @Input() coinsView: Array<CoinApi> = [];
  @Output () coinBuy = new EventEmitter<CoinApi>;

  coinsFiltred: Array<CoinApi> = [];

  coinToSearch: string = '';
  mostrarMas: boolean = false;

  userIsLoged: boolean = true;


  constructor(private router: Router){ }

  //!Se utiliza ngOnChanges para reaccionar a los cambios del @Input que recibe el componente.
  //!Si no se hace este metodo  'coins2' seria null y no funcionaria el filtrado de busqueda.
  ngOnChanges(changes: SimpleChanges): void {
    this.coinsFiltred = [...this.coinsView]
  }

  public coinToBuy (coin: CoinApi){
    console.log('Desde buy', coin);
    this.coinBuy.emit(coin);
  }

  public verMas(): void {
    this.router.navigate(['/main']);
    this.mostrarMas = true;

  }

  public buscarCoin(): void {
    this.coinsFiltred = this.coinsView.filter((c) =>
      c.name.toLowerCase().includes(this.coinToSearch.toLowerCase()) ||
      c.symbol.toLowerCase().includes(this.coinToSearch.toLowerCase())
    );
  }

}
