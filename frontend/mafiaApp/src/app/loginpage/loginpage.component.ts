import { SyncService } from './../sync.service';
import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit } from '@angular/core';
import {AngularWebStorageModule, SessionStorageService} from 'angular-web-storage';
import { from } from 'rxjs';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit{
  username:string = "";
  session:string = "";
  audio;
  isAlready:boolean = true;
  isJoining:boolean = false;
  id:string="undefined";
  joinee:string="not decided";
  constructor(private userService:UserSessionsService ,
    private service:SyncService,
    private storage:SessionStorageService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { 
      this.audio = new Audio();
      this.audio.src = "assets/audio.mp3";
      this.audio.load();
      this.audio.play();
    }
    ngOnInit(){
      this.activatedRoute.queryParams.subscribe(paramsId => {
        this.id = paramsId['id'];
        console.log((this.id));
        if(this.id)
        {
          this.isJoining=true;
          this.joinee="joining";
          console.log(this.joinee);
        }
        else{
          this.joinee="newgame";
        }
    });
    
    }

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

  joinGame():void{
    this.isJoining = true;
  }

  enterGame():void {
    this.userService.userName = this.username;
    this.service.joinGame(this.username,this.id).then((response)=>{
      console.log(response);
      this.storage.set('session', response['session']);
      if(response['error'] === "Player already exists")
        this.isAlready = true;
      else {
        this.isAlready = false;
      }
    }).then(response => {
      this.router.navigate(["/lobby"]);
    });
  }
}
