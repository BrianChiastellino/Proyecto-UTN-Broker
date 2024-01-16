import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/core/Models';
import { JsonComentarioService } from 'src/app/core/services/json-comentario.service';
import { ComentarioService } from 'src/app/modules/landing/services/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {



  comentarios: Comentario[] = [];
  constructor(private comentarioService: JsonComentarioService) { }

  ngOnInit(): void {
    this.obtenerComentarios();
  }

  obtenerComentarios() {
    this.comentarioService.getAllComentarios().subscribe(
      (comentarios: Comentario[]) => {
        this.comentarios = comentarios;
        console.log('Comentarios recuperados:', this.comentarios);
      },
      error => {
        console.error('Error al recuperar comentarios:', error);
      }
    );
  }

}
