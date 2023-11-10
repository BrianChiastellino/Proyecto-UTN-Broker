import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CoinApi, User } from 'src/app/core/Models';

@Component({
  selector: 'app-view-coins-api',
  templateUrl: './view-coins-api.component.html',
  styleUrls: ['./view-coins-api.component.css']
})

export class ViewCoinsApiComponent implements OnChanges, OnInit {

  @Input() coinsView: Array<CoinApi> = [];
  @Output () coinBuy = new EventEmitter<CoinApi>;

  coinsFiltred: Array<CoinApi> = [];

  coinToSearch: string = '';
  mostrarMas: boolean = false;

  userIsLoged: boolean = false;
  user!: User;



  ngOnInit(): void {

  }


  constructor(private router: Router){ }

  //!Se utiliza ngOnChanges para reaccionar a los cambios del @Input que recibe el componente.
  //!Si no se hace este metodo  'coins2' seria null y no funcionaria el filtrado de busqueda.
  ngOnChanges(changes: SimpleChanges): void {
    this.coinsFiltred = [...this.coinsView]
    this.loginOn()

  }

  mostrarMenuCompra() : void {

  }

  public coinToBuy (coin: CoinApi){
    console.log('Desde buy', coin);
    this.coinBuy.emit(coin);
  }

  public verMas(): void {
    if(this.userIsLoged === true){
      this.router.navigate(['/main']);

    }else{
      this.router.navigate(['/login']);

    }

  }

  public buscarCoin(): void {
    this.coinsFiltred = this.coinsView.filter((c) =>
      c.name.toLowerCase().includes(this.coinToSearch.toLowerCase()) ||
      c.symbol.toLowerCase().includes(this.coinToSearch.toLowerCase())
    );
  }
  public loginOn(){
    const userData = sessionStorage.getItem('userLoged');

    if(userData) {
      this.user = new User(JSON.parse(sessionStorage.getItem('userLoged')!));

      if(this.user.isLoged){
        this.mostrarMas = true;
        this.userIsLoged = true;

      }else{
        this.userIsLoged = false;
      }


    }

  }





}

/* si necesitamos todo el usuario esta es la forma sino solo el logued
public loginOn(){
  const userData = sessionStorage.getItem('userLoged');

  if(userData) {
    this.user = new User(JSON.parse(sessionStorage.getItem('userLoged')!));

    if(this.user.isLoged){
      this.userIsLoged = true;

    }else{
      this.userIsLoged = false;
    }


  }

} */
