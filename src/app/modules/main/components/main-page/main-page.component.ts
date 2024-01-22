import { CoinApiService } from 'src/app/modules/coinApi/services/coin-api.service';
import { CoinApi, User, Wallet } from './../../../../core/Models';
import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', './toast-noti.component.css'],
})

//!todo: ENVIAR TODA LA INFO AL MAIN PARA QUE EL MAIN USE LOS SERVICIOS Y GUARDE CON EL BACK
//!todo: Una vez que sabemos que coins tiene el usuario pintar de color rojo las que no tiene para que seap que no puede vender.
//!todo: QUE EL USUARIO PUEDA VENDER CANTIDAD DE COINS PARA QUE SEA MAS FACIL LA VENTA


export class MainPageComponent implements OnInit {

  userLoged!: User;
  allCoins: Array<CoinApi> = []
  coin!: CoinApi;
  coinToSell!: CoinApi;

  private informacionSubscription?: Subscription;
  public mostrarNotificacion: number = -1;
  public abrirNotificacion: boolean = false;

  constructor(private coinApiService: CoinApiService, private dataService: DataService, private router: Router) {



    this.informacionSubscription = this.dataService.informacion$.subscribe((v) => {
      this.mostrarNotificacion = v;
      this.abrirNotificacion = true;

      setTimeout(() => {
        this.abrirNotificacion = false;
        this.cerrarNotificacion();
      }, 3500);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.abrirNotificacion = false;
        this.mostrarNotificacion = -1;
      }
    });

  }

  cerrarNotificacion() {
    this.abrirNotificacion = false;
    setTimeout(() => {
      this.mostrarNotificacion = -1;
    }, 150);
  }

  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));

    this.getAllCoins();
  }







  //!Hay un límite de 30 solicitudes por minuto a la API pública.
  public updateViewCoins(): void {
    this.getAllCoins();
  }

  public getAllCoins(): void {
    this.coinApiService.getAllGoins().then((c) => this.allCoins = c.slice())

  }

  public enviarCoin(coin: CoinApi) {
    this.coin = coin;
  }

  public enviarCoinToSell(coin: CoinApi) {
    this.coinToSell = coin;
  }











}
