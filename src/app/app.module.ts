import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoinApiModule } from './modules/coinApi/coin-api.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoinApiModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    IonicModule


  ],

  bootstrap: [AppComponent],
  providers: [{ provide: CarouselConfig, useValue: { interval: 5000, noPause: false, showIndicators: true } }]
})
export class AppModule { }
