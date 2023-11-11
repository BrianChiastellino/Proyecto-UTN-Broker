import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/core/Models';
import { JsonComentarioService } from 'src/app/core/services/json-comentario.service';
import { lastValueFrom } from 'rxjs';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent   {

  }

