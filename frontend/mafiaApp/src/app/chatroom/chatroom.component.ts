import { UserSessionsService } from './../user-sessions.service';
import {  HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  url ="http://localhost:8000/chat/send/";
  results:any[]=[];
  randomKey:number;
  sentmessage=false;
  chatEnabled = false;

  ngOnInit(){
     
  }
  constructor(private http:HttpClient, el: ElementRef ,private user:UserSessionsService) {
    setInterval(function(){
    },3);
  }
  text:string;
  message=[];
  playerName:String=this.user.User.username;
  colorPlayer=this.user.User.color;
  sendMessage(){ 
  console.log(this.playerName);
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


