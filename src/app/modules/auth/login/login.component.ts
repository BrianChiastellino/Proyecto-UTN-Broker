import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public passwordVisible: boolean = false;

  public registroOn: boolean = false;
  public userLog: boolean = false;

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  showPassword: any;
  formRegister: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {


  }

  public async checkLog() {
    const email = this.formLogin.get('email')!.value;
    const password = this.formLogin.get('password')!.value;

    const check = this.authService.checkLog(email, password);

    if (await check) {
      this.router.navigate(['/main'])
    } else {
      this.userLog = true;


      setTimeout(() => {
        this.userLog = false;
      }, 2500);


    }

    this.registroOn = true;

    // await check ? this.router.navigate(['/main']) : alert("Usuario Inexistente"),

  }

  public goToRegistro() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.passwordVisible ? 'text' : 'password';
  }

  camposCompletos () : boolean {

    const email = this.formLogin.get('email')!.value;
    const password = this.formLogin.get('password')!.value;

    return email !== '' && password !== '';

  }




}
