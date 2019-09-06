import { AppComponent } from './../app.component';
import { SessionStorage, SessionStorageService } from 'angular-web-storage';
import { Component, OnInit } from '@angular/core';
import { UserSessionsService } from './../user-sessions.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { SyncService } from '../sync.service';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

    
    randomKey;
    hintsArray=[];
    suspiciousThings=["was heard giggling when god woke up the Mafia","was seen in a heated argument with the victim","was seen near the house of the victim","was seen buying a knife"];
    session_id:number;
    game_data = [];
    
    earlierVotedPlayer = "";
    playerNames =[];
    constructor(private userSessionsService:UserSessionsService,private sync:SyncService, private session: SessionStorageService) { 
        this.sync.VotesSource.subscribe(message => {
            // console.log(message);
            this.voteProcessing(message);
          });
          setInterval(function(){
          },3);
        this.session_id = this.session.get("session");
    }
    
    ngOnInit() {
        this.sync.startChat();
        this.getPlayers();
        this.game_data.forEach(element => {
            if(element['alive']){
                this.playerNames.push(element['name']);
            }
             });
             for (let index = 0; index < this.suspiciousThings.length; index++) {
          
                var len = this.playerNames.length;
                this.randomKey = Math.floor(Math.random() * len);
                var targetName = (this.playerNames[this.randomKey]);
                this.game_data.forEach(element => {
                    if(element['name'] == targetName)
                    {
                        element['hint'] = targetName + " " + this.suspiciousThings[index];
                    }
                });               
                this.playerNames.splice(this.randomKey,1);
                }
     
    }

    getPlayers(){
        this.sync.getPlayers().subscribe(response =>{
            console.log(typeof(response),response);
            for(var element of response) {
                console.log(element);
                this.game_data.push({"name":element.name,"avatar":element.avatar,"voted":"","voters":[],
                                        "previous":"","alive":true,"hint":"hint","text_color":element.color});
            }
        });
        console.log(this.game_data);        
    }

    voteProcessing(message){
        console.log(message);
        console.log(this.earlierVotedPlayer);
        var voter = message['voter'];
        var voted = message['voted'];
        // first time vote
        this.game_data.forEach(element => {
            if(element['name'] == voter && element['voted'] == ""){
                element['voted'] = voted;
                this.game_data.forEach(element => {
                    if(element['name']==voted)
                        element['voters'].push(voter);
                });
            }
            else if(element['name'] == voter && element['voted'] == voted){
                element['voted']="";
                this.game_data.forEach(element => {
                    if(element['name']==voted){
                        console.log(element['voters'].indexOf(voter));                       
                        element['voters'].splice(element['voters'].indexOf(voter),1);
                    }
                });
            }
            else if(element['name'] == voter && element['voted']!= voted){
                this.game_data.forEach(element => {
                    if(element['voters'].indexOf(voter)!=-1){
                        element['voters'].splice(element['voters'].indexOf(voter),1);
                    }
                });
                element['voted'] = voted;
                this.game_data.forEach(element => {
                    if(element['name']==voted){
                        element['voters'].push(voter);
                    }
                });           
            }
        });
    }

    voteCasted(argument){
        var clickedPlayer;
        // this.websocket.send(JSON.stringify({'username':'ankit'}));
        // console.log(argument['target'].innerText.split("\n")[0]);
        // console.log(argument);
        //   Finding Clicked Player
        if(argument['target'].className == "mat-figure")
            clickedPlayer = argument['target'].innerText.split("\n")[0];
        else
            clickedPlayer = argument['target'].innerText.split("\n")[0];
        
        console.log("clickedPlayer: "+clickedPlayer);
        this.sync.vote(this.username,clickedPlayer);
    }

    get username(){
        return this.userSessionsService.User.username;
        // return "Someone";
    }

    get role(){
        return this.userSessionsService.role;
    }
   
}
