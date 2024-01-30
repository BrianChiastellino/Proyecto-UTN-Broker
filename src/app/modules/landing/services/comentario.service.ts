import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Comentario } from 'src/app/core/Models';
import { JsonComentarioService } from 'src/app/core/services/json-comentario.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private comentarioService: JsonComentarioService) { }

  public async getComentario() {

    try {

      let response = this.comentarioService.getAllComentarios();

      const data = await lastValueFrom(response);
      return data.map((c: any) => new Comentario(c));
    }
    catch (error) {
      console.error('Error al querer obtener todas los comentarios', error)
      return []
    }
  }

  

}
