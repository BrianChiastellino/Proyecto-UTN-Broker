import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'


import { AppComponent } from './app.component';
import { CoinsModule } from './modules/Coins/coins.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistroComponent } from './modules/auth/registro/registro.component';
import { LandingPageComponent } from './modules/landing/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    LandingPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoinsModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
