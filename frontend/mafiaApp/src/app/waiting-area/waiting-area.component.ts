import { SyncService } from './../sync.service';
import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../user';
import { __await } from 'tslib';
import { timer } from 'rxjs';

@Component({
  selector: 'waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.css']
})

export class WaitingAreaComponent implements OnInit {
  roleVisibility = false;
  user:User = new User();
  visibleLink=false;
  userRole ="mafia";
  cardImage ="https://media.istockphoto.com/photos/playing-card-king-of-spades-picture-id458126511?k=6&m=458126511&s=612x612&w=0&h=x0PjZz2iHWp20B02idcOE_UBoOh2XGkQoUiucxcHalg=";
  imageList =["https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161489__480.png","https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161485__480.png",
  "https://cdn.pixabay.com/photo/2014/03/25/17/01/spades-297839__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161488__480.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161494_1280.png",
  "https://cdn.pixabay.com/photo/2012/04/18/19/20/card-37623_1280.png",
"https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161487__480.png",
"https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161490__480.png",
"https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161492__480.png",
"https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161487__480.png",
];
  previousElement:any = undefined;
  constructor(private userService:UserSessionsService,private roleSetter:SyncService) { 
    this.visibleLink=false;
   
  }

  linkVisible(){
    this.visibleLink=!this.visibleLink;
  }
  i = 0;
  iterCount =0;
  role;
  color;
  ngOnInit() {
    
    this.user.avatar = "https://api.adorable.io/avatars/100/abe@adorable.png";    
    this.setCards(50,0);
    this.setCards(100,0);
    this.user.username = this.userService.userName; 
     console.log(this.user.username);
    this.roleSetter.getRole().subscribe(response=>{
      this.role = response['role'];
      this.color = response['color'];
    });
  }

  setAvatar(element):void {
      if(this.previousElement !== undefined)
      this.previousElement.classList.remove('selected');
    this.user.avatar = element.src;
    element.classList.add("selected");
    this.previousElement = element;
    this.userService.setUserRole(this.role);
    this.roleSetter.setPlayer({'name':this.user.username,'avatar':this.user.avatar,'role':this.role,'alive':'True' ,'color':this.color});
    this.userService.userProperties(this.user.avatar,this.role,'true',this.color);
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
      else if(times == 5){
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

}