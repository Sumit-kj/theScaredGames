import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class UserSessionsService {
  theUser:User = new User();
  url:string = "http://localhost:8000/role/getrole/"
  constructor(private http:HttpClient) { }

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
  setUserRole(roleName):void {
    this.theUser.role = roleName;
    console.log(this.theUser.role); 
  }
  get User(): User {
    // this.theUser.username = "player_7"; 
    // this.userProperties("","#8B008B","detective",true);
    return this.theUser;
  }
  get userName(): string {
    return this.theUser.username;
  }
}
