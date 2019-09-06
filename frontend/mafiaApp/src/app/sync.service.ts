import { UserSessionsService } from './user-sessions.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SyncService {
  url:string  = "ws://localhost:8000/sync/"
  private votesSource = new Subject<JSON>();
  private playerSource = new Subject<JSON>();
  private readySource = new Subject<JSON>();
  private messageSource = new Subject<JSON>();
  urlhttp:string = "http://localhost:8000/";
  messageSocket:WebSocket;
  playerSocket: WebSocket;
  constructor(private http:HttpClient ,private storage:SessionStorageService ,private user: UserSessionsService) {
    
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

  getAlive(name: string){
    var urlalive = this.urlhttp+"status/";
    var json_name = new FormData();
    json_name.append('name',name);
    return this.http.post(urlalive,json_name,{'responseType':'json'});
  }
  startChat(): void {
    this.messageSocket = new WebSocket(this.url+this.storage.get('session')+'a/');
    this.messageSocket.onmessage = (event)=> {
      console.info(event);
      this.messageSource.next(JSON.parse(event['data']));
    }
  }
  startGame(name: string): Promise<any> {
    //ankit do this
    var urlgame = this.urlhttp+"create_session/";
    var json_name = new FormData();
    json_name.append('name',name);
    return this.http.post(urlgame,json_name,{'responseType':'json'}).toPromise();
  }
  
  sendMessage(username, message): void {
    this.messageSocket.send(JSON.stringify({'type':'chat', 'name': username,'message':message}));
  }
  vote(){}
  kill(){}
  getVotes(){}
  endGame(){}
  getMessages(){}
  startPlayerLobby(){
    this.playerSocket = new WebSocket('ws://localhost:8000/ready/'+this.storage.get('session')+'/');
    this.playerSocket.onmessage = (response) => {
    if(response['type']=='lobby_join')
    {
         return ({'join':response['username']});
    }
    else if(response['type']=='lobby_read')
    {
        return({'ready':response['username']});
    }
    }
  }

  getRole(){
    var urlrole = this.urlhttp+"role/"+this.storage.get('session');
    return this.http.get(urlrole,{'responseType':'json'});
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
    json_player.append('session',this.storage.get('session'));
    console.log(json_player,this.storage.get('session'));
    this.http.post(urlplayer,json_player,{'responseType':'json'}).subscribe(response=>
      { console.log(response);} 
     );
  } 
  joinGame(name,sessionId): Promise<any> {
    var urlgame =this.urlhttp+"join_session/"+sessionId+"/";
    var alreadyExists = false;
    var json_name = new FormData();
    json_name.append('name',name);
    return this.http.post(urlgame,json_name,{'responseType':'json'}).toPromise();
  }

  endChat(): void {
    this.messageSocket.close();
  }
}
