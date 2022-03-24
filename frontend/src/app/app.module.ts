import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//additional component imports
import { TimeplaceComponent } from './timeplace/timeplace.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { ConnectionComponent } from './connection/connection.component';
import { ConnectionlistComponent } from './connectionlist/connectionlist.component';
import { QueryformComponent } from './queryform/queryform.component';
import { SearchbuttonComponent } from './searchbutton/searchbutton.component';
import { NoresultComponent } from './noresult/noresult.component';
import { ClockComponent } from './clock/clock.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ResultComponent,
    TimeplaceComponent,
    ConnectionComponent,
    ConnectionlistComponent,
    QueryformComponent,
    SearchbuttonComponent,
    NoresultComponent,
    ClockComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
