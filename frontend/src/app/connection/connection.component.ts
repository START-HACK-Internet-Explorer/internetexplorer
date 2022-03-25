import { Component, Input, OnChanges } from '@angular/core';
import { JourneyInfo } from '../backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnChanges {

  @Input() item?: JourneyInfo;

  departureDate = '';
  arrivalDate = '';
  duration = '';

  constructor() { }

  ngOnChanges(): void {
    if (this.item) {
      const departure = moment(this.item.time);
      this.departureDate = departure.format("hh:mm");
      const arrival = moment(new Date(departure.valueOf() + this.item.duration));
      this.arrivalDate = arrival.format('hh:mm');
      this.duration = moment.duration(this.item.duration).humanize();
    }
  }

}
