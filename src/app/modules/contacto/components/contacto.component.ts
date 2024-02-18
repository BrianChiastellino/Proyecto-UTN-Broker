import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})




export class ContactoComponent {

  public nombre: string = '';
  public email: string = '';
  public asunto: string = '';
  public mensaje: string = '';
  public emailEnviado: boolean = false;

  borrarInput() {
    this.nombre = '';
    this.email = '';
    this.asunto = '';
    this.mensaje = '';

    this.emailEnviado = true;

    setTimeout(() => {
      this.emailEnviado = false;
    }, 3000);

  }

  camposCompletos () : boolean {
    return this.nombre.trim() !== '' && this.email.trim() !== '' && this.asunto.trim() !== '' && this.mensaje.trim() !== '';

  }


}
