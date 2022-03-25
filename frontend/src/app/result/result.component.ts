import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { BackendService, JourneyInfo } from '../backend.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  journeyDetail = new BehaviorSubject<JourneyInfo | null>(null);
  journeyDetailDirect: JourneyInfo | null = null;

  departureDate = '';
  arrivalDate = '';
  recommendedDate = '';
  duration = '';

  constructor(private backendService: BackendService, private router: Router) {
    this.journeyDetail = backendService.journeyInfo;
    this.journeyDetail.subscribe(item => this.journeyDetailDirect = item);
  }

  ngOnInit(): void {
    if (!this.journeyDetailDirect) {
      this.router.navigateByUrl('/');
    }
    if (this.journeyDetailDirect) {
      this.departureDate = moment(this.journeyDetailDirect.time).format('hh:mm');
      this.arrivalDate = moment(this.journeyDetailDirect.time).add(this.journeyDetailDirect.duration).format('hh:mm');
      this.recommendedDate = moment(this.journeyDetailDirect.recommended).format('hh:mm');
      this.duration = moment.duration(this.journeyDetailDirect.duration).humanize();
    }
  }

  select(event: JourneyInfo) {
    this.backendService.setJourneyInfo(event);
    this.router.navigate(['result']);
  }
}
