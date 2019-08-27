import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  json_data = {
    "1":{
        "player_1":
        {
            "role":"mafia",
            "avatar":"",
            "alive":true,
            "text_color":"#ccaadd"
        },
        "player_2":
        {
            "role":"mafia",
            "avatar":"",
            "alive":true,
            "text_color":"#ccbbdd"
        },
        "player_3":
        {
            "role":"mafia",
            "avatar":"",
            "alive":true,
            "text_color":"#ccccdd"
        },
        "player_4":
        {
            "role":"detective",
            "avatar":"",
            "alive":true,
            "text_color":"#ccdddd"
        },
        "player_5":
        {
            "role":"detective",
            "avatar":"",
            "alive":true,
            "text_color":"#cceedd"
        },
        "player_6":
        {
            "role":"doctor",
            "avatar":"",
            "alive":true,
            "text_color":"#ccffdd"
        },
        "player_7":
        {
            "role":"citizen",
            "avatar":"",
            "alive":true,
            "text_color":"#ccaadd"
        },
        "player_8":
        {
            "role":"citizen",
            "avatar":"",
            "alive":true,
            "text_color":"#ccaadd"
        },
        "player_9":
        {
            "role":"citizen",
            "avatar":"",
            "alive":true,
            "text_color":"#ccaadd"
        },
        "player_10":
        {
            "role":"citizen",
            "avatar":"",
            "alive":true,
            "text_color":"#ccaadd"
        }
    }
};
session_id = 1;
game_data;
rows_count;
columns_count;

  constructor(private http: HttpClient) { 


}

  ngOnInit() {
    this.game_data = this.json_data[this.session_id];
  }

}
