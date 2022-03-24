import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeplaceComponent } from './timeplace.component';

describe('TimeplaceComponent', () => {
  let component: TimeplaceComponent;
  let fixture: ComponentFixture<TimeplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
