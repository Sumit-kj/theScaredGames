import { Component, OnInit } from '@angular/core';
import { UserSessionsService } from './../user-sessions.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

    names=[];
    randomKey;

    json_data = {
        "1":[
            
            {
                "name":"player_1",
                "role":"mafia",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#0000cd"
            },
            {
                "name":"player_2",
                "role":"mafia",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#F08080"
            },
            {
                "name":"player_3",
                "role":"mafia",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#00ff00"
            },
            {
                "name":"player_4",
                "role":"detective",
                "avatar":"",
                "voted":"",
                "voters":["player_3","player_8"],
                "alive":true,
                "hint":"hint",
                "text_color":"#40e0d0"
            },
            {
                "name":"player_5",
                "role":"detective",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#7B68EE"
            },
            {
                "name":"player_6",
                "role":"doctor",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#FF00ff"
            },
            {
                "name":"player_7",
                "role":"citizen",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#8B008B"
            },
            {
                "name":"player_8",
                "role":"citizen",
                "avatar":"",
                "voted":"",
                "voters":["player_4","player_7","player_9"],
                "alive":true,
                "hint":"hint",
                "text_color":"#FF1493"
            },
            {
                "name":"player_9",
                "role":"citizen",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#DAA520"
            },
            {
                "name":"player_10",
                "role":"citizen",
                "avatar":"",
                "voted":"",
                "voters":[],
                "alive":true,
                "hint":"hint",
                "text_color":"#ccaadd"
            }
        ]
    };
    session_id = 1;
    game_data;
    earlierVotedPlayer = "player_8";
    playerNames =[];
    constructor(private userSessionsService:UserSessionsService) { 
    }
    
    ngOnInit() {
        this.game_data = this.json_data[this.session_id];
        console.log(this.game_data.length);
        // console.log(this.username);
    }

    voteCasted(argument){
        var clickedPlayer;
        //   Finding Clicked Player
        if(argument['path'][0].className == "mat-figure")
            clickedPlayer = argument['path'][1].id;
        else
            clickedPlayer = argument['path'][2].id;
        console.log("clickedPlayer: "+clickedPlayer);
      
        this.randomKey = Math.floor(Math.random() * 10);
        console.log(this.json_data[this.session_id][this.randomKey].name);
        //   check if same player clicked again
        if(this.earlierVotedPlayer == clickedPlayer){
            //   voted and voter attribute reset and deleted
            this.game_data.forEach(element => {
                if(element['name']== this.username){
                    element['voted']="";
                }
                if(element['name']==clickedPlayer){
                    element['voters'].splice(element['voters'].indexOf(this.username),1);
                }
            });
        }
        // not the same player clicked
        //   check if player already voted for this one
        else{
            this.game_data.forEach(element => {
                if(element['name']== this.username){
                    element['voted']=clickedPlayer;
                }
                if(element['name']==clickedPlayer){
                    element['voters'].push(this.username)
                }
            });
            if(this.earlierVotedPlayer!=""){
                this.game_data.forEach(element => {
                    if(element['name']== this.earlierVotedPlayer)
                        element['voters'].splice(element['voters'].indexOf(this.username),1);                        
                });
            }
            if(this.earlierVotedPlayer!="")
                console.log("earlierPlayer: "+this.earlierVotedPlayer);
            console.log(this.game_data);  
            
        }
        if(this.earlierVotedPlayer == clickedPlayer)
            this.earlierVotedPlayer = "";
        else
            this.earlierVotedPlayer = clickedPlayer;
    }

    get username(){
        return this.userSessionsService.User.username;
    }
   
}
