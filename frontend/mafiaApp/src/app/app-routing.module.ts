import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { LoginpageComponent } from './loginpage/loginpage.component';


const routes: Routes = [
  {'path': '', component:LoginpageComponent },
  {'path': 'lobby', component:WaitingAreaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
