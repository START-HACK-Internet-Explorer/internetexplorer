import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-queryform',
  templateUrl: './queryform.component.html',
  styleUrls: ['./queryform.component.scss']
})
export class QueryformComponent implements OnInit {
  from?: string;
  to?:string;
  departuretime?:string;
  
  constructor(private searchservice:SearchService) {
    this.searchservice.search.subscribe(x => this.sendData())
  }

  ngOnInit(): void {
  }

  sendData(){
    const dataToSend ={
      from: this.from,
      to: this.to,
      departuretime: this.departuretime,
    }
    console.log(dataToSend)
  }

}
