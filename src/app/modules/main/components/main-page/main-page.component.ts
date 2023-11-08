import { UserApiService } from 'src/app/core/services/user-api.service';
import { Coin, User } from './../../../../core/Models';
import { Component, OnInit, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

   user!: User;




  // constructor(private userApi: UserApiService){}

   ngOnInit(): void {
     this.user = new User(JSON.parse( sessionStorage.getItem('userLoged')!));
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
