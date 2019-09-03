import { UserSessionsService } from './user-sessions.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class SyncService {
  url:string  = "ws://localhost:8000/sync/"
  private votesSource = new Subject<JSON>();
  private playerSource = new Subject<JSON>();
  private messageSource = new Subject<JSON>();
  urlhttp:string = "http://localhost:8000/";
  messageSocket:WebSocket;
  
  constructor(private http:HttpClient ,private storage:SessionStorageService ,private user: UserSessionsService) {
    this.messageSocket = new WebSocket(this.url);
    this.messageSocket.onmessage = (event)=> {
      console.log('message socket says:',event);
    }
  }
  get VotesSource(): Observable<JSON> {
    return this.votesSource.asObservable();
  }
  get PlayerSource(): Observable<JSON> {
    return this.playerSource.asObservable();
  }
  get MessageSource(): Observable<JSON> {
    return this.messageSource.asObservable();
  }
  startGame(name): void {
    //ankit do this
    var urlgame = this.urlhttp+"create_session/";
     var json_name = new FormData();
    json_name.append('name',name);
    this.http.post(urlgame,json_name,{'responseType':'json'}).subscribe(response=>
       {  this.storage.set('session', response['session']);
          console.log(this.storage.get('session'));
        console.log(response);} 
      );
  }
  
  sendMessage(message): void {
    this.messageSocket.send(JSON.stringify({'message':'sent this message'}));
  }
  vote(){}
  kill(){}
  getVotes(){}
  endGame(){}
  getMessages(){}
  getPlayers(){}
  getRole(){
    var role;
    var urlrole = this.urlhttp+"role/";
    return this.http.get(urlrole,{'responseType':'json'})
    return role;
  } 
  stateChange(){}
  setPlayer(playerDetails){
    var urlplayer =this.urlhttp+"add_player/";
    var json_player=new FormData();
    json_player.append('name',playerDetails['name']);
    json_player.append('avatar',playerDetails['avatar']);
    json_player.append('alive',playerDetails['alive']);
    json_player.append('color',playerDetails['color']);
    json_player.append('role',playerDetails['role']);
    console.log(playerDetails);
    this.http.post(urlplayer,json_player,{'responseType':'json'}).subscribe(response=>
      { console.log(response);} 
     );
  } 
}
