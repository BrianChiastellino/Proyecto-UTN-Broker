import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models';
import { Observable } from 'rxjs';

//todo: eliminar

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private urlBaseUser = " http://localhost:3000";

  constructor(private http: HttpClient) { }

  getLogApi(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlBaseUser}/users`);
  }

  getuserToAuth(email: string, password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.urlBaseUser}/users?email=${email}&password=${password}`);
  }

  addUser(user: User) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlBaseUser}/users`, user);
  }

  existUser(email: string, document: string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.urlBaseUser}/users?email=${email}&document=${document}`);
  }

  updateUser(user:User) : Observable<User>{

    if(!user.id) throw Error('Error al updatear el usuario');

    return this.http.patch<User>(`${this.urlBaseUser}/users/${user.id}`, user)
  }


}
