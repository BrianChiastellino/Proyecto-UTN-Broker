import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class JsonComentarioService {

  private urlComentario = 'http://localhost:3000/comentarios'

  constructor(private http: HttpClient) { }

  getAllComentarios () : Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.urlComentario}`);
  }
  
}
