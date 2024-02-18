import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoinApi, User, Wallet } from 'src/app/core/Models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {

  userLoged!: User;

  public images: String[] = [
    'assets/images/btclogo_001.png',
    'assets/images/ethlogo_001.png',
    'assets/images/ethlogo_001.png'
  ];

  constructor() {

  }




  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  }



}

