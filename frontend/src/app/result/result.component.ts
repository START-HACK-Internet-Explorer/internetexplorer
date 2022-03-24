import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  journeyDetails = new BehaviorSubject<boolean>(true);

  constructor(private backendService: BackendService) { }


  ngOnInit(): void {
  }

}
