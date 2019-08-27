import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 

import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    WaitingAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
