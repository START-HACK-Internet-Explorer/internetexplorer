import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-queryform',
  templateUrl: './queryform.component.html',
  styleUrls: ['./queryform.component.scss']
})
export class QueryformComponent implements OnInit {
  @Input() start?: string;
  @Input() stop?:string;
  @Input() time?: string;

  constructor(private searchservice:SearchService, private router: Router) {
    this.searchservice.search.subscribe(x => this.sendData())
  }

  ngOnInit(): void {
  }

  sendData(){
    if (this.start && this.stop && this.time) {
      const dataToSend = {
        start: this.start,
        stop: this.stop,
        time: this.time
      }
      this.router.navigate(['/search'], { queryParams: dataToSend });
    }
  }

}
