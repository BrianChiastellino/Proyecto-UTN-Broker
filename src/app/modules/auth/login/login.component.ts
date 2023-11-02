import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : User = new User();
  
  constructor(private authService : AuthService, private router:Router){}

  ngOnInit(): void {

  }

  public async checkLog(){

    const {email, password} = this.user;

    const check = this.authService.checkLog(email,password);

    await check ? this.router.navigate(['/landing']) : alert('No se encontró el usuario');

    // if(await check){
    //   this.router.navigate(['/landing']);
    // }else{
    //   alert('No se encontro usuario');
    // }

  }

}
