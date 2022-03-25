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
      this.departureDate = moment(this.item.time).format('HH:MM');
      this.arrivalDate = moment(this.item.time).add(this.item.duration).format('HH:MM');
      this.duration = moment.duration(this.item.duration).humanize();
    }
  }

}
