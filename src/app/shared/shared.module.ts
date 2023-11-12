import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ComentariosComponent
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
