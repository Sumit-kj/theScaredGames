import { UserSessionsService } from './../user-sessions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.css']
})
export class WaitingAreaComponent implements OnInit {

  visibleLink=false;
  constructor(private userService:UserSessionsService) { 
    this.visibleLink=false;
  }

  linkVisible(){
        this.visibleLink=!this.visibleLink;
  }
  onStart()
  {
    console.log("Started");
  }
  onFinished()
  {
    console.log("finished");
  }
  ngOnInit() {
    console.log("Started");
    console.log(this.userService.User.username);
  }
}