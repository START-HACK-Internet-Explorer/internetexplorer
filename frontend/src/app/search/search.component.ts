import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService, JourneyInfo } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  start = '';
  stop = '';
  time = '';

  journeyDetails: BehaviorSubject<JourneyInfo[]>;
  journeyDetailsArray: JourneyInfo[] = [];

  constructor(private backendService: BackendService, private activatedRoute:ActivatedRoute, private router: Router) {
    this.journeyDetails = backendService.journeyInfos;
    this.journeyDetails.subscribe(items => this.journeyDetailsArray = items);
    this.activatedRoute.queryParams.subscribe(params => {

      this.start = params['start'];
      this.stop = params['stop'];
      this.time = params['time'];
      const currentTime = moment(this.time).toDate();

      let first = true;
      this.backendService.connectionStateChanged.subscribe(connectionState => {
        if (connectionState) {
          if (first) {
            if (this.start, this.stop, currentTime) {
              this.backendService.search(this.start, this.stop, currentTime);
            }
          }
          first = false;
        }
      });

    });
  }

  select(event: JourneyInfo) {
    this.backendService.setJourneyInfo(event);
    this.router.navigate(['result']);
  }
}
