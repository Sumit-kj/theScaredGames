import { UserSessionsService } from './../user-sessions.service';
import {  HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { SyncService } from '../sync.service';
@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  results:any[]=[];
  randomKey:number;
  sentmessage=false;
  chatEnabled = false;
  text:string;
  colorPlayer="blue";
  message=[];
  playerName:String=this.user.User.username;

  ngOnInit(){
     
  }
  constructor(private sync:SyncService,private user:UserSessionsService) {
    this.sync.MessageSource.subscribe(message => {
      console.log(message)
      this.sentmessage = true;
      this.message.unshift(message)
    });
    setInterval(function(){
    },3);
  }
 
  sendMessage(){ 
    console.log(this.playerName);
    var msgjson = this.text;
    if(msgjson=="")
      return;
      // console.log(this.text);
    this.sync.sendMessage('kartik', msgjson)
    this.text = "";
    // console.log(this.message);
    
  } 
  
}


