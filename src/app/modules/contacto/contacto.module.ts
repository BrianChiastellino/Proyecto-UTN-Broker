import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactoComponent } from './components/contacto.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ContactoModule { }
