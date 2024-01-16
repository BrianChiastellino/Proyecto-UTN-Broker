import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Error404Component } from './components/error404/error404.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ComentariosComponent,
    Error404Component,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule

  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ComentariosComponent,
  ],
  providers: [{ provide: CarouselConfig, useValue: { interval: 5000, noPause: false, showIndicators: true } }]
})
export class SharedModule { }
