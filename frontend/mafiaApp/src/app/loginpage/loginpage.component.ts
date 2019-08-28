import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit, Input } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { User } from '../user';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  constructor(private userSessionsService:UserSessionsService) { }
  visibleInput=true;
  
  ngOnInit() {
    console.log("Started");
    console.log(this.userSessionsService.User.username);
  }
  registerFunc($event){
    this.visibleInput=false;
    console.log($event);
  }
}
