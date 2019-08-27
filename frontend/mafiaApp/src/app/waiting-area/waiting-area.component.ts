import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.css']
})
export class WaitingAreaComponent  {

  visibleLink=false;
  constructor() { 
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

}
