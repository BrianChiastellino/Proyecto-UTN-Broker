import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models';


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

