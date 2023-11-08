import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  user: User = new User();

  constructor(private authSrvice: AuthService, private router: Router) { }

  public async registerUser() {
    const wasRegisted = this.authSrvice.checkRegister(this.user);

    if (!await wasRegisted) {
      alert('Usuario registrado con exito');
      this.router.navigate(['/login']);
    } else {
      alert('El usuario no se pudo registrar');
    }

  }
  goToIniciarSesion(){
    this.router.navigate(["/login"]);
  }


}
