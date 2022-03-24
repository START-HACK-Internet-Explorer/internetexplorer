import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService, JourneyInfo } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  journeyDetails: BehaviorSubject<JourneyInfo[]>;
  journeyDetailsArray: JourneyInfo[] = [];

  constructor(private backendService: BackendService, private activatedRoute:ActivatedRoute, private router: Router) {
    this.journeyDetails = backendService.journeyInfos;
    this.journeyDetails.subscribe(items => this.journeyDetailsArray = items);
    this.activatedRoute.queryParams.subscribe(params => {

      let start = params['start'];
      let stop = params['stop'];
      let time = params['time'];

      console.log(start);
      console.log(stop);
      console.log(time);


      let first = true;
      this.backendService.connectionStateChanged.subscribe(connectionState => {
        if (connectionState) {
          if (first) {
            this.backendService.search('Zug', 'Luzern', new Date(new Date().getTime() + 10000));
          }
          first = false;
        }
      });

     //this.backendService.search('','',new Date(new Date().getTime() + 10000)))
    });
  }

  select(event: JourneyInfo) {
    this.backendService.setJourneyInfo(event);
    this.router.navigate(['result']);
  }
}
