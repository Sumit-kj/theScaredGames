import { ChatroomComponent } from './chatroom/chatroom.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { VotingComponent } from './voting/voting.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge'
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { DayNightComponent } from './day-night/day-night.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    WaitingAreaComponent,
    
    VotingComponent,
    
    DayNightComponent,
    ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
