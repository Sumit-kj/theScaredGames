import { SessionStorage, SessionStorageService } from 'angular-web-storage';
import { SyncService } from './../sync.service';
import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { User } from '../user';
import { __await } from 'tslib';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.css']
})

export class WaitingAreaComponent implements OnInit,OnDestroy {

  roleVisibility = false;
  user:User = new User();
  visibleLink=false;
  userRole ="";
  websocket:WebSocket;
  cardImage ="https://static7.depositphotos.com/1257959/746/v/950/depositphotos_7461933-stock-illustration-playing-card-back-side-62x90.jpg";
  imageList =[
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161489__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161485__480.png",
  "https://cdn.pixabay.com/photo/2014/03/25/17/01/spades-297839__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161488__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161494_1280.png",
  "https://cdn.pixabay.com/photo/2012/04/18/19/20/card-37623_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161487__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161490__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161492__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161487__480.png",
  ];
  i:number = 0;
  iterCount:number = 0;
  role:string;
  color:string;
  previousElement:any = undefined;
  isReady:boolean = true;
  playerState:string = "Select An Avatar";

  constructor(private userService:UserSessionsService,private router: Router,private roleSetter:SyncService ,private storage: SessionStorageService) {
    this.visibleLink=false;
    this.websocket = new WebSocket('ws://10.20.27.76:8000/ready/'+this.storage.get('session')+'/');
    this.websocket.onmessage = (response) => {
      console.log(response);
    }
  }

  linkVisible(){
    this.visibleLink=!this.visibleLink;
  }

  ngOnInit() {
    this.user.avatar = "https://static.wixstatic.com/media/13a4a7_93009681d85f450e97640bc48592963d~mv2_d_2633_1542_s_2.jpeg/v1/fill/w_1600,h_937,al_c,q_90/file.jpg";
    this.user.username = this.userService.userName;
     console.log(this.user.username);
    this.roleSetter.getRole().subscribe(response=>{
      response['role']="mafia";
      this.role = response['role'];
      this.color = response['color'];
      this.user.role = this.role;
      this.user.color = this.color;
    });
    
  }
  ngOnDestroy(): void {
    this.websocket.close();
  }
  setAvatar(element):void {
    this.websocket.send(JSON.stringify({'type': 'player_join', 'username': this.user.username }))
    this.isReady=false;
    this.playerState = "Ready";
    if(this.previousElement !== undefined)
        this.previousElement.classList.remove('selected');
    this.user.avatar = element.src;
    element.classList.add("selected");
    this.previousElement = element;
  }

  beginGame():void {

  }

  setCards(val:number,times:number):void {
    var timer = setInterval(()=>{
      this.cardImage = this.imageList[this.i];
      if(this.i == this.imageList.length-1)
      {
        this.i = 0;
        times++;
      }
      else if(times == 3){
        this.iterCount++;
        var val =0;
        switch(this.role){
          case "citizen":
            val = 5;break;
          case "mafia":
            val = 2;break;
          case "doctor":
            val = 4; break;
          default:
            val = 1;
        }
        this.cardImage = this.imageList[val];
        clearInterval(timer);
        if(this.iterCount == 2)
        this.roleVisibility =true;
    }
      else  {
        this.i++;
      }
    }, val);

  }

  onReady(){
      if(this.playerState == "Waiting for other Players")
        this.router.navigate(['game/']);
      this.isReady=true;
      this.playerState="Waiting for other Players";
      this.setCards(50,0);
      this.setCards(100,0);
      this.userService.setUserRole(this.role);
      this.roleSetter.setPlayer({'name':this.user.username,'avatar':this.user.avatar,'role':this.role,'alive':'True' ,'color':this.color});
      this.userService.userProperties(this.user.avatar,this.color,this.role,true);
      this.websocket.send(JSON.stringify({'type':'ready', 'username': this.user.username }))
  }

}
