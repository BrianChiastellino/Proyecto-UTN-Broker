import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loginOnSideBar: boolean = false;
  userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
  
  isNavbarOpen = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.viewSideBarItems();

  }

  sideBarOn = false;

  viewSideBar() {
    this.sideBarOn = !this.sideBarOn;
  }

  goToHome() {
   this.router.navigate(['/landing']) ;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToMyWallet(){
    this.router.navigate(['main/myWallet']);
  }
  goToMarket(){
    this.router.navigate(['main']);
  }

  cerrarSesion() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/landing']);
    window.location.reload();
  }
  public viewSideBarItems() {
    const loginOn = localStorage.getItem('loginOn');
    if (loginOn == 'true') {
      this.loginOnSideBar = true;
      console.log('El usuario está conectado');
    }
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
