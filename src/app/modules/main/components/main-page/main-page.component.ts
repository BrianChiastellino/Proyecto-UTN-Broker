import { CoinApiService } from 'src/app/modules/coinApi/services/coin-api.service';
import { CoinApi, User } from './../../../../core/Models';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userLoged!: User;
  allCoins: Array<CoinApi> = []
  coin!: CoinApi;

  constructor(private coinApiService: CoinApiService) { }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getAllCoins();
  }

  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getAllCoins();
    alert('Se actualizo la lista');
  }

  public getAllCoins(): void {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())
  }

  public enviarCoin(coin: CoinApi){
    this.coin = coin;
    console.log('Desde MAIN',this.coin)
  }












  // probar () {
  //   this.user.myWallet.idUser = this.user.id;
  //   this.user.myWallet.idWallet = this.user.id! * 10;

  //   console.log(this.user);

  //   this.updateUser(this.user).then( u => alert('Se updateo la wallet'));
  // }

  // comprarCoin (){

  //   const coinprueba: Coin = new Coin();

  //   coinprueba.amount = 109;
  //   coinprueba.idCoin = 'bitcoin';

  //   this.user.myWallet.myCoins.push(coinprueba);
  //   this.updateUser(this.user).then( u => alert('Se updateo la coin'));
  // }

  // async updateUser (user: User) : Promise<User | null>{

  //   let resp: User | null = null;

  //   try{

  //     let apiResponse = this.userApi.updateUser(user);

  //     resp = await lastValueFrom(apiResponse);


  //   }catch(error){
  //     console.error(error);
  //   }

  //   return resp;

  // }







}
