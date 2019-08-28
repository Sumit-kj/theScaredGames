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
    this.sentmessage = true;
    var msgjson = this.text;
    if(msgjson=="")
      return;
      console.log(this.text);
    var jsonf = {'name':this.playerName,'message':msgjson};
    this.message.unshift(jsonf);
    this.text = "";
    console.log(this.message);
  }
 
}


