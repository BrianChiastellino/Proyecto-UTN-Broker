import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {

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

}
