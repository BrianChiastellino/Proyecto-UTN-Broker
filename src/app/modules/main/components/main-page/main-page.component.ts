import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models';
import { SharedInfoService } from 'src/app/core/services/shared-info.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  user: User = new User();

  constructor(private sharedInfo: SharedInfoService){}

  ngOnInit(): void {
    this.user = this.sharedInfo.getUser();
  }



}
