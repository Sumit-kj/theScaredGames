import { ChatroomComponent } from './chatroom/chatroom.component';
import { VotingComponent } from './voting/voting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DayNightComponent } from './day-night/day-night.component';


const routes: Routes = [
  {'path': '', component:LoginpageComponent },
  {'path': 'lobby', component:WaitingAreaComponent},
  {'path': 'voting', component:VotingComponent},
  {'path': 'game', component:DayNightComponent},
  {'path': 'chat', component:ChatroomComponent },
  {'path': 'join_game/session',component:LoginpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
