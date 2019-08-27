import { Component, OnInit } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {

  constructor() { }
  visibleInput=true;
  
  registerFunc($event){
    this.visibleInput=false;
    console.log($event);
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
