import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  @Input() displayNumber!: string;

  constructor() { }

  numbers = [false, false, false, false, false, false, false];

  ngOnInit(): void {
    this.numbers = this.numbers.map(item => false);
    switch (this.displayNumber) {
      case '0':
        [0,1,2,3,4,5].forEach(item => this.numbers[item] = true);
        break;
      case '1':
        [1,2].forEach(item => this.numbers[item] = true);
        break;
      case '2':
        [0,1,3,4,6].forEach(item => this.numbers[item] = true);
        break;
      case '3':
        [0,1,2,3,6].forEach(item => this.numbers[item] = true);
        break;
      case '4':
        [1,2,5,6].forEach(item => this.numbers[item] = true);
        break;
      case '5':
        [0,2,3,5,6].forEach(item => this.numbers[item] = true);
        break;
      case '6':
        [0,2,3,4,5,6].forEach(item => this.numbers[item] = true);
        break;
      case '7':
        [0,1,2].forEach(item => this.numbers[item] = true);
        break;
      case '8':
        [0,1,2,3,4,5,6].forEach(item => this.numbers[item] = true);
        break;
      case '9':
        [0,1,2,3,5,6].forEach(item => this.numbers[item] = true);
        break;
    }
  }

}
