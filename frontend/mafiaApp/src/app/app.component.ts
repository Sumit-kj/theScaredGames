import { User } from './user';
import { Component, OnInit } from '@angular/core';
// import { SyncService } from './sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mafiaApp';
  theUser:User = new User();

  constructor(){

  }
  ngOnInit(): void {
  }
  sendMessage(): void {
    // this.sync.sendMessage('hello');
  }
}
