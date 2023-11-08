import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { User } from '../Models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userApiService: UserApiService ) { }

  public async checkLog(email: string, password: string) {

    let user: User[] = [];

    try {

      let apiResponse = this.userApiService.getuserToAuth(email, password);

      user = await lastValueFrom(apiResponse);

      // this.sharedInfo.setUser(user[0]);

      if (user.length == 1){
        user[0].isLoged = true;
        sessionStorage.setItem('userLoged', JSON.stringify(user[0]))
      }

    } catch (error) {
      console.log('Erro en checklog', error);
    }

    return user.length == 1;
  }

  public async checkRegister(user: User) {

    let exist = true;

    try {

      let apiResposnse = this.userApiService.getLogApi();

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

  public registerUser(user: User) {

    this.userApiService.addUser(user).subscribe({
      next: () => {
        // alert('Registrado con exito')
      },
      error: () => {
        // alert('Erro en registrar')
      }
    })
  }




}
