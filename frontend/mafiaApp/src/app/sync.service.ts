import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  url:string  = "ws://localhost:8000/sync/"
  private votesSource = new Subject<JSON>();
  private playerSource = new Subject<JSON>();
  private messageSource = new Subject<JSON>();

  messageSocket:WebSocket;
  
  constructor() {
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
  startGame(): void {
    //ankit do this
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
  getRole(){} //Anki do this
  stateChange(){}
  setPlayer(){} //Ankit do this
}
