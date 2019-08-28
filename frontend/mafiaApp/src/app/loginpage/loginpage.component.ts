import { UserSessionsService } from './../user-sessions.service';
import { Component } from '@angular/core';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  username:string = "";
  constructor(private userService:UserSessionsService) { }
   
  startGame():void {
    this.userService.userName = this.username;
  }
}
