import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ComentariosComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),

  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ComentariosComponent
  ],
  providers: [{ provide: CarouselConfig, useValue: { interval: 5000, noPause: false, showIndicators: true } }]
})
export class SharedModule { }
