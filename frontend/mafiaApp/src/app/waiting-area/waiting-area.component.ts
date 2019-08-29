import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.css']
})
export class WaitingAreaComponent implements OnInit {
  user:User = new User();
  visibleLink=false;
  cardImage ="https://media.istockphoto.com/photos/playing-card-king-of-spades-picture-id458126511?k=6&m=458126511&s=612x612&w=0&h=x0PjZz2iHWp20B02idcOE_UBoOh2XGkQoUiucxcHalg=";
  cardImage = "https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161489__480.png";
  previousElement:any = undefined;
  constructor(private userService:UserSessionsService) { 
    this.visibleLink=false;
  }

  linkVisible(){
    this.visibleLink=!this.visibleLink;
  }
  ngOnInit() {
    this.user.username = this.userService.User.username; 
    this.user.avatar = "https://api.adorable.io/avatars/100/abe@adorable.png";
    console.log(this.userService.User.username);
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
}