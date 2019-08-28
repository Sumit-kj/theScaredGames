import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionsService {
  theUser:User = new User();
  constructor() { }

  set userName(value:string) {
    this.theUser.username = value;
  }
  userProperties(avatar:string,color:string,
    role:string,alive:boolean):void {

    this.theUser.avatar = avatar;
    this.theUser.color = color;
    this.theUser.role = role;
    this.theUser.alive = alive;
  }
  get User(): User {
    this.theUser.username = "player_7";
    this.theUser.role = "mafia";
    this.theUser.avatar = "";
    this.theUser.alive = true;
    this.theUser.color = "blue";
    return this.theUser;
  }
  get userName(): string {
    return this.theUser.username;
  }
}
