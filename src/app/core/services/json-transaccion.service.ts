import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaccion } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonTransaccionService {

  private urlTransaccion = "http://localhost:3000/transaccion"

  constructor(private http: HttpClient) { }

  getAllTransacciones () : Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.urlTransaccion}`);
  }

  addTransaccion (transaccion: Transaccion) : Observable<boolean>{
    return this.http.post<boolean>(`${this.urlTransaccion}`,transaccion)
  }

  updateTransaccion(transaccion: Transaccion) : Observable<Transaccion>{

    if(!transaccion.id) throw Error ('Error al updatear transaccion');

    return this.http.patch<Transaccion>(`${this.urlTransaccion}/${transaccion.id}`, transaccion);
  }
}
