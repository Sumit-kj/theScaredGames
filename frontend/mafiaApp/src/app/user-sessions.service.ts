import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionsService {
  theUser:User = new User();
  constructor() { }

  get User(): User {
    this.theUser.username = "player_7";
    this.theUser.role = "mafia";
    this.theUser.avatar = "";
    this.theUser.alive = true;
    this.theUser.color = "blue";
    return this.theUser;
  }
}
