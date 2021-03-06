import { UserSessionsService } from './../user-sessions.service';
import {  HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { SyncService } from '../sync.service';
@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  results:any[]=[];
  randomKey:number;
  sentmessage=false;
  chatEnabled = false;
  text:string;
  colorPlayer=this.user.User.color;
  
  message=[];
  playerName:String=this.user.User.username;

  ngOnInit(){
    this.sync.startChat();
  }
  constructor(private sync:SyncService,private user:UserSessionsService) {
    this.sync.MessageSource.subscribe(message => {
      console.log(message)
      if(message['type']=="chat.message"){
        this.sentmessage = true;
        this.message.unshift(message)
      }
    });
    setInterval(function(){
    },3);
  }
  
  ngOnDestroy(): void {
    this.sync.endChat();
  }
  sendMessage(){ 
    console.log(this.playerName);
    var msgjson = this.text;
    if(msgjson=="")
      return;
    this.sync.sendMessage(this.playerName, msgjson)
    this.text = "";   
    console.log(this.user.User.color);
  } 
  
}


