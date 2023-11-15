import { Component, OnInit } from '@angular/core';
import { Comentario, User } from 'src/app/core/Models';
import { JsonComentarioService } from 'src/app/core/services/json-comentario.service';
import { lastValueFrom } from 'rxjs';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit   {

  userLoged! : User;
  constructor(){
  }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  }

  }

