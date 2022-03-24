import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JourneyInfo } from '../backend.service';

@Component({
  selector: 'app-connectionlist',
  templateUrl: './connectionlist.component.html',
  styleUrls: ['./connectionlist.component.scss']
})
export class ConnectionlistComponent implements OnInit {

  @Input() items: JourneyInfo[] = [];

  @Output() selected = new EventEmitter<JourneyInfo>();

  constructor() { }

  ngOnInit(): void {
  }

}
