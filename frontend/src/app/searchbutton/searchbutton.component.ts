import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchbutton',
  templateUrl: './searchbutton.component.html',
  styleUrls: ['./searchbutton.component.scss']
})
export class SearchbuttonComponent implements OnInit {

  constructor(private searchservice:SearchService) { }

  buttonevent() {
    this.searchservice.search.next(true);
  }
  ngOnInit(): void {
  }

}
