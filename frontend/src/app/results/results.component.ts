import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { BackendService, JourneyInfo } from '../backend.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

 
  constructor(private backendService: BackendService) { }


  ngOnInit(): void {
  }

}
