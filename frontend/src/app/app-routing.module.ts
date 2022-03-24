import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent},
{ path: 'search', component: SearchComponent },
{ path: 'result', component: ResultComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
