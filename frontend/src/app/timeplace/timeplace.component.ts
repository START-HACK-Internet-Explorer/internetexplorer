import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeplace',
  templateUrl: './timeplace.component.html',
  styleUrls: ['./timeplace.component.scss']
})
export class TimeplaceComponent {

  @Input() time = '';
  @Input() place = '';

  constructor() { }

}
