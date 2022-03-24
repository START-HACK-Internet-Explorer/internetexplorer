import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeconnectionsobjComponent } from './alternativeconnectionsobj.component';

describe('AlternativeconnectionsobjComponent', () => {
  let component: AlternativeconnectionsobjComponent;
  let fixture: ComponentFixture<AlternativeconnectionsobjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativeconnectionsobjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeconnectionsobjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
