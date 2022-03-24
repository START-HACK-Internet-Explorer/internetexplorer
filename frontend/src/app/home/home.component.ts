import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BackendService, JourneyInfo } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  journeyDetails: BehaviorSubject<JourneyInfo[]>;
  journeyDetailsArray: JourneyInfo[] = [];
  time = (new Date()).toISOString().slice(0, -1);

  constructor(private backendService: BackendService, private router: Router) {
    this.journeyDetails = backendService.lastJourneys;
    this.journeyDetails.subscribe(items => {
      this.journeyDetailsArray = items
    });

    let first = true;
    this.backendService.connectionStateChanged.subscribe(connectionState => {
      if (connectionState) {
        if (first) {
          this.backendService.getLast();
        }
        first = false;
      }
    });
  }

  select(event: JourneyInfo) {
    this.backendService.setJourneyInfo(event);
    this.router.navigate(['result']);
  }
}
