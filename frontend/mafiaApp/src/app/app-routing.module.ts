import { VotingComponent } from './voting/voting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { LoginpageComponent } from './loginpage/loginpage.component';


const routes: Routes = [
  {'path': '', component:LoginpageComponent },
  {'path': 'lobby', component:WaitingAreaComponent},
  {'path': 'voting', component:VotingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
