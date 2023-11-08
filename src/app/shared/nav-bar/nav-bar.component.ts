import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loginOnSideBar : boolean = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.viewSideBarItems();

  }

  sideBarOn = false;

  viewSideBar() {
    this.sideBarOn = !this.sideBarOn;
  }
  
  goTohome() {
    this.router.navigate(['/landing']);

  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  cerrarSesion(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/landing']);

  }
  public viewSideBarItems(){
    const loginOn = localStorage.getItem('loginOn');
   if (loginOn === 'true') {
       this.loginOnSideBar = true;
   console.log('El usuario está conectado');
     }
  }

}
