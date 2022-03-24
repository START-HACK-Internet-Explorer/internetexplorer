import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//additional component imports
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

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent},
{ path: 'search', component: SearchComponent },
{ path: 'results', component: ResultsComponent },
];
@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    ResultsComponent,
    TimeplaceComponent,
    ConnectionComponent,
    ConnectionlistComponent,
    QueryformComponent,
    SearchbuttonComponent,
    NoresultComponent,
    GraphComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
