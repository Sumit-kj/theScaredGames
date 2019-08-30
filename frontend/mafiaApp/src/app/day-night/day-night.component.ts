import { AppComponent } from './../app.component';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountdownComponent } from 'ngx-countdown';
import { UserSessionsService } from '../user-sessions.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-day-night',
  templateUrl: './day-night.component.html',
  styleUrls: ['./day-night.component.css']
})
export class DayNightComponent implements OnInit {

  @ViewChild('countdown',{static:true}) counter: CountdownComponent = null ;

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
            "voters":[],
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
            "voters":[],
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
    this.gameStart();
  }
  constructor(private _snackBar: MatSnackBar, private userSessionsService:UserSessionsService, public dialog: MatDialog) { }

  game_state : String;
  game_phase : String;
  game_message : String;
  session_id = "1";
  timer_period = 0;
  dead_player = "player_4";
  animal: String;
  name: String;

  gameStart(): void{
    this.trans_state_night_begins();
  }

  trans_state_night_begins(){
    this.game_phase = "trans";
    this.game_state = "night begins";
    this.game_message ="Mafias Arise!";
    this.timer_period = 1;
  }

  mafia_phase(){
    this.game_phase = "game";
    this.game_state = "mafia"; 
    this.timer_period = 1
    this.counter.restart();
    console.log("mafia_phase");
  }

  trans_state_mafia_ends(){
    this.game_phase = "trans";
    this.game_state = "mafia to detective";
    this.game_message = "Mafias Sleep!";
    this.timer_period = 1;
    this.counter.restart();
  }

  detective_phase(){
    this.game_phase = "game";
    this.game_state = "detective";
    this.timer_period = 1;
    this.counter.restart();
  }

  trans_state_detective_ends(){
    this.game_phase = "trans";
    this.game_state = "detective to doctor";
    this.game_message = "Detectives Sleep!";
    this.timer_period = 1;
    this.counter.restart();
  }

  doctor_phase(){
    this.game_phase = "game";
    this.game_state = "doctor";
    this.timer_period = 1;
    this.counter.restart();
  }

  trans_state_doctor_ends(){
    this.game_phase = "trans";
    this.game_state = "night ends";
    this.game_message = "Doctor Sleep!";
    this.timer_period = 1;
    this.counter.restart();
  }

  trans_state_day_begins(){
    this.game_phase = "trans";
    this.game_state = "day begins";
    this.game_message ="The city wakes up to find that ";
    this.timer_period = 3;
    this.counter.restart();
  }

  city_phase(){
    this.game_phase = "game";
    this.game_state = "city";
    this.timer_period = 1;
    this.counter.restart();
  }

  defence_dialog_popup(){
    this.game_state = "defence";
    this.openDialog();
    this.timer_period = 60;
    this.counter.restart();
  }

  onFinished(){
    switch(this.game_state){
      case "night begins": 
        this.mafia_phase();
        break;
      case "mafia": 
        this.trans_state_mafia_ends();
        break;
      case "mafia to detective": 
        this.detective_phase();
        break;
      case "detective": 
        this. trans_state_detective_ends();
        break;
      case "detective to doctor":
        this.doctor_phase();
        break;
      case "doctor":
        this.trans_state_doctor_ends();
        break;
      case "night ends":
        this.trans_state_day_begins();
        break;
      case "day begins":
        this.city_phase();
        break;
      case "city":
        this.defence_dialog_popup();
        break;
      case "defence":
        this.dialog.closeAll();
        break;
    }
  }

  onNotify(){
    switch(this.game_state){
      case "mafia":
        this.openSnackBar("Come on Mafia! Are you sure He's not a Threat? 5 seconds left!");
        break;
      case "detective":
        this.openSnackBar("Come on Detective! A lot is at Stake, 5 seconds left!");
        break;
      case "doctor":
        this.openSnackBar("Come on Doctor! Someone is at Risk! Is that you? 5 seconds left!");
        break;
      case "mafia to detective":
        this.game_message = "Detectives Arise!";
        break;
      case "detective to doctor":
        this.game_message = "Doctor Arise!";
        break;
      case "day begins":
        this.game_message = this.dead_player+" is dead!";
        break;
    }
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

  openSnackBar(message: string) {
      this._snackBar.open(message, "", {
        duration: 3000,
      });
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px', height: '510px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
    console.log(dialogRef);
  }

  get user(){
    return this.userSessionsService.User;
}

  get game_data(){
    return this.json_data[this.session_id];
  }
}

// for the dialog

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'defence-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}