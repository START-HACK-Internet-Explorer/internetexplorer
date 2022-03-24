import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService, JourneyInfo } from '../backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  journeyDetails: BehaviorSubject<JourneyInfo | null>;

  constructor(private backendService: BackendService, private activatedRoute:ActivatedRoute) {
    this.journeyDetails = backendService.journeyInfo;
    this.journeyDetails.subscribe(blah => console.log(blah))
    
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {

      let start = params['start'];
      let stop = params['stop'];
      let time = params['time'];

      console.log(start);
      console.log(stop);
      console.log(time);


      this.backendService.search('Zug', 'Luzern', new Date(new Date().getTime() + 10000));
     //this.backendService.search('','',new Date(new Date().getTime() + 10000)))
    });
  }
}