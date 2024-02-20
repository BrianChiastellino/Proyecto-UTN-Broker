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

  public user: User = new User();
  public userInfo: boolean = false;
  public userLog: boolean = false;
  public passwordVisible: boolean = false;


  constructor(private authSrvice: AuthService, private router: Router) { }

  public async registerUser() {

    if (this.validarEmail() && this.validarPassword()) {

      const wasRegisted = this.authSrvice.checkRegister(this.user);

      if (!await wasRegisted) {
        this.userLog = true;

        setTimeout(() => {
          this.userLog = false;
          this.router.navigate(['/login']);

        }, 2000);

      } else {
        this.userInfo = true;

        setTimeout(() => {
          this.userInfo = false;
        }, 3000);
      }

    } else {
      this.userInfo = true;

      setTimeout(() => {
        this.userInfo = false;
      }, 3000);
    }

  }

  goToIniciarSesion(): void {
    this.router.navigate(["/login"]);
  }

  validarEmail(): boolean {
    const emailValido = this.user.email.includes('@') && (this.user.email.endsWith('@gmail.com') || this.user.email.endsWith('@hotmail.com'));
    console.log(emailValido);
    return emailValido;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.passwordVisible ? 'text' : 'password';
  }

  quitarLetras(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  quitarNumeros(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }



  validarPassword(): boolean {

    // Una letra minúscula
    // Una letra mayúscula
    // Un dígito
    // Un carácter especial

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]*$/;
    const passwordValido = regex.test(this.user.password);
    console.log(passwordValido);
    return passwordValido;
  }



}
