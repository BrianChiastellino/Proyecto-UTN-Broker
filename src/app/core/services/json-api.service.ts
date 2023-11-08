import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaccion, User, Wallet } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {


  private urlUser = " http://localhost:3000";
  private urlWallet = "http://localhost:3000/wallet"
  private urlTransaccion = "http://localhost:3000/transaccion"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUser}/users`);
  }

  getuserToAuth(email: string, password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUser}/users?email=${email}&password=${password}`);
  }

  addUser(user: User) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlUser}/users`, user);
  }

  existUser(email: string, document: string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.urlUser}/users?email=${email}&document=${document}`);
  }

  updateUser(user:User) : Observable<User>{

    if(!user.id) throw Error('Error al updatear el usuario');

    return this.http.patch<User>(`${this.urlUser}/users/${user.id}`, user)
  }

  getAllWallets () : Observable<Wallet[]>{
    return this.http.get<Wallet[]>(`${this.urlWallet}`);
  }

  addWallet (wallet: Wallet) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlWallet}`, wallet);
  }

  getAllTransacciones () : Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.urlTransaccion}`);
  }

  addTransaccion (transaccion: Transaccion) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlTransaccion}`,transaccion)
  }








}
