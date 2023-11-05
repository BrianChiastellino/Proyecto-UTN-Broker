import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.component.html',
  styleUrls: ['./view-coins.component.css']
})

export class ViewCoinsComponent implements OnChanges {

  @Input() coinsView: Array<Coin> = [];
  coinsFiltred: Array<Coin> = [];

  coinToSearch: string = '';
  mostrarMas: boolean = false;

  userIsLoged: boolean = true;

  //!Se utiliza ngOnChanges para reaccionar a los cambios del @Input que recibe el componente.
  //!Si no se hace este metodo  'coins2' seria null y no funcionaria el filtrado de busqueda.
  ngOnChanges(changes: SimpleChanges): void {
    this.coinsFiltred = [...this.coinsView]
  }

  public verMas(): void {
    this.mostrarMas = !this.mostrarMas;
  }

  public buscarCoin(): void {
    this.coinsFiltred = this.coinsView.filter((c) =>
      c.name.toLowerCase().includes(this.coinToSearch.toLowerCase()) ||
      c.symbol.toLowerCase().includes(this.coinToSearch.toLowerCase())
    );
  }

}
