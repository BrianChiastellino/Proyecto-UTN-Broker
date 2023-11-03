import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.component.html',
  styleUrls: ['./view-coins.component.css']
})
export class ViewCoinsComponent {

  @Input () coins: Array<Coin> = [];

  mostrarMas = false;

  verMas() {
    this.mostrarMas = !this.mostrarMas;
  }

}
