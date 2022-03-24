import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeplaceComponent } from './timeplace/timeplace.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { ConnectionComponent } from './connection/connection.component';
import { ConnectionlistComponent } from './connectionlist/connectionlist.component';
import { QueryformComponent } from './queryform/queryform.component';
import { SearchbuttonComponent } from './searchbutton/searchbutton.component';
import { NoresultComponent } from './noresult/noresult.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    ConnectionlistComponent,
    QueryformComponent,
    SearchbuttonComponent,
    NoresultComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
