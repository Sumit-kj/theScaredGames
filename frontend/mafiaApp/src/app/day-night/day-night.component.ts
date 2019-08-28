import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-day-night',
  templateUrl: './day-night.component.html',
  styleUrls: ['./day-night.component.css']
})
export class DayNightComponent implements OnInit {

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

  ngOnInit() {
    this.gameControl();
  }
  constructor(private _snackBar: MatSnackBar) { }

  game_state : String;
  session_id = "1";
  timer_period = 0;

  gameControl(): void{
    if(this.checkIsGameOver())
      return;
    this.mafia_phase();
  }

  mafia_phase(){
    this.timer_period = 60;
  }

  onNotify(){
    this.openSnackBar("Time is running, 5 seconds left!","");
  }

  checkIsGameOver(): boolean{
    var mafia_count = 0;
    var citizen_count = 0;
    this.game_data.forEach(element => {
      if(element['alive']){
        if(element['role']=="mafia")
          mafia_count++;
        else
          citizen_count++;
      }
    });
    return mafia_count>citizen_count;
  }

  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: this.timer_period*1000,
      });
  } 

  get game_data(){
    return this.json_data[this.session_id];
  }
}
