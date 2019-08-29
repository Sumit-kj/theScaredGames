import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent  {
  url ="http://localhost:8000/chat/send/";
  results:any[]=[];
  randomKey:number;
  sentmessage=false;
  chatEnabled = false;
  constructor(private http:HttpClient) {
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
    this.http.post<any>(this.url,jsonf,{'responseType':'json'}).subscribe(response =>{
      console.log(response.status);
    });

   
    this.message.unshift(jsonf);
    this.text = "";
    // console.log(this.message);
    
  }
  
  
}


