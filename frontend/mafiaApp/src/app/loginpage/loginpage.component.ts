import { HttpClient } from '@angular/common/http';
import { UserSessionsService } from './../user-sessions.service';
import { Component } from '@angular/core';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  username:string = "";
  constructor(private userService:UserSessionsService,private http:HttpClient) { }
  url:string ="http://localhost:8000/create_session/"; 
  startGame():void {
    this.userService.userName = this.username;
    var json_name = new FormData();
    json_name.append('name',this.username);
    this.http.post(this.url,json_name,{'responseType':'json'}).subscribe(response=>
      {console.log(response);}
      );
  }
}
