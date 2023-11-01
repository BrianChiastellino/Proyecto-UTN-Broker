import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlLog = " http://localhost:3000";

  constructor(private http: HttpClient) { }

  getLogApi(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlLog}/users`);
  }

  getuserToAuth(email: string, password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.urlLog}/users?email=${email}&password=${password}`);
  }


}
