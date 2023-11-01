import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Models';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService:ApiService) { }

  public async checkLog(email:string, password:string){
    let user: User[]=[];
    try {
      let apiResponse = this.apiService.getuserToAuth(email,password);
      user= await lastValueFrom (apiResponse);
      
    } catch (error) {
      console.log(error);
    }
    return user.length ==1;
  }
}
