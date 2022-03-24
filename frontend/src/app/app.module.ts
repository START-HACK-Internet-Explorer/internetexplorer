import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeplaceComponent } from './timeplace/timeplace.component';
import { AlternativeconnectionsComponent } from './alternativeconnections/alternativeconnections.component';
import { AlternativeconnectionsobjComponent } from './alternativeconnectionsobj/alternativeconnectionsobj.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeplaceComponent,
    AlternativeconnectionsComponent,
    AlternativeconnectionsobjComponent,
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
