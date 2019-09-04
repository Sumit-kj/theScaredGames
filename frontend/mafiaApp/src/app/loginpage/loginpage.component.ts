import { SyncService } from './../sync.service';
import { UserSessionsService } from './../user-sessions.service';
import { Component } from '@angular/core';
import {AngularWebStorageModule, SessionStorageService} from 'angular-web-storage'
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  username:string = "";
  constructor(private userService:UserSessionsService ,
    private service:SyncService,
    private storage:SessionStorageService,
    private router: Router) { }
  url:string ="http://localhost:8000/create_session/"; 
  startGame():void {
    this.userService.userName = this.username;
    // console.log(this.userService.userName);
    this.service.startGame(this.username).then(response =>
      {  
        this.storage.set('session', response['session']);
        console.log(this.storage.get('session'));
        console.log(response);
      }).then(value => {
        this.router.navigate(['/lobby']);
      }).catch(err => {
        console.error(err," happened");
      });
}
}
