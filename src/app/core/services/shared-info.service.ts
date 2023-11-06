import { Injectable } from '@angular/core';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class SharedInfoService {

  constructor() { }

  user: User = new User();

  getUser() {
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }


}
