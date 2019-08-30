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
  constructor(private userService:UserSessionsService) { 
    this.visibleLink=false;
   
  }

  linkVisible(){
    this.visibleLink=!this.visibleLink;
  }
  i = 0;
  
  ngOnInit() {
    this.user.username = this.userService.User.username; 
    this.user.avatar = "https://api.adorable.io/avatars/100/abe@adorable.png";    
    this.setCards(50,0);
    this.setCards(100,0);
  }

  setAvatar(element):void {
    console.log(element);
    if(this.previousElement !== undefined)
      this.previousElement.classList.remove('selected');
    this.user.avatar = element.src;
    element.classList.add("selected");
    this.previousElement = element;
  }
  beginGame():void {
    this.userService.setUserRole();
  }
  setCards(val:number,times:number):void {
    console.log("here");
    var timer = setInterval(()=>{
      // console.log(times);
      this.cardImage = this.imageList[this.i];
      if(this.i == this.imageList.length-1)
      {
        this.i = 0;
        times++;
      }
      else if(times == 5){
        var val =0;
        switch(this.userRole){
          case "citizen":
            val = 4;break;
          case "mafia":
            val = 2;break;
          case "doctor":
            val = 3; break;
          default:
            val = 1;
        }
        this.cardImage = this.imageList[val];
        clearInterval(timer);
    }
      else  {
        this.i++;
      }    
    }, val);

  }

}