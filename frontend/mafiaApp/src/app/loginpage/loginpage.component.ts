import { SyncService } from './../sync.service';
import { HttpClient } from '@angular/common/http';
import { UserSessionsService } from './../user-sessions.service';
import { Component } from '@angular/core';
import {AngularWebStorageModule} from 'angular-web-storage'
import { from } from 'rxjs';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  username:string = "";
  constructor(private userService:UserSessionsService,private http:HttpClient, private service:SyncService) { }
  url:string ="http://localhost:8000/create_session/"; 
  startGame():void {
    this.userService.userName = this.username;
    // console.log(this.userService.userName);
    this.service.startGame(this.username);
}
}
