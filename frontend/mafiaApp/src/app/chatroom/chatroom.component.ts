import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent  {
  results:any[]=[];
  randomKey:number;
  sentmessage=false;
  chatEnabled = false;
  constructor(private http:HttpClient) {
    http.get<any>('http://jsonplaceholder.typicode.com/posts').subscribe(response => {
    this.results.push(response)
  });   

    console.log(this.results);
  }
  text:string;
  colorPlayer="blue";
  message=[];
  playerName:String="player_7"
  sendMessage(){
    
    var msgjson = this.text;
    if(msgjson=="")
      return;
      this.sentmessage = true;
      // console.log(this.text);
    var jsonf = {'name':this.playerName,'message':msgjson};
    this.message.unshift(jsonf);
    this.text = "";
    // console.log(this.message);
    this.randomKey = Math.floor(Math.random() * 10);
    console.log(this.names[this.randomKey]);
  }
  names=['player1','player2','player3','player4','player5','player6','player7','player8','player9','player10'];
  
}


