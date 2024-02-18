import { Injectable } from '@angular/core';
import { User } from '../../Models';
import { lastValueFrom } from 'rxjs';
import { JsonApiService } from '../json-api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private jsonApiService: JsonApiService) { }

  public async checkLog(email: string, password: string) {

    let user: User[] = [];

    try {

      let apiResponse = this.jsonApiService.getuserToAuth(email, password);

      user = await lastValueFrom(apiResponse);

      if (user.length == 1) {
        user[0].isLoged = true;
        sessionStorage.setItem('userLoged', JSON.stringify(user[0]));
        localStorage.setItem('loginOn', user[0].isLoged.toString());
      }

    } catch (error) {
      console.log('Erro en checklog', error);
    }

    return user.length == 1;
  }

  public async checkRegister(user: User) {

    let exist = true;

    try {

      let apiResposnse = this.jsonApiService.getAllUsers();

      let data = await lastValueFrom(apiResposnse);

      const userApi = data.find((dataUser) => dataUser.document == user.document || dataUser.email == user.email);

      if (userApi != undefined) {
        exist = true;
      } else {
        this.registerUser(user);
        exist = false;
      }


    }
    catch (error) {
      console.log('Error en checkRegister', error);
    }

    return exist;

  }

  //todo: Modificar esta funcion
  public registerUser(user: User) {

    this.jsonApiService.addUser(user).subscribe({
      next: () => {
    
      },
      error: () => {

      }
    })
  }

  public checkSesionUser(): boolean {
    return sessionStorage.getItem('userLoged') ? true : false
  }
}
