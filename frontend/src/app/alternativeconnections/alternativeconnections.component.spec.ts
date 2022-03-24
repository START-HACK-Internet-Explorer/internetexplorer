import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeconnectionsComponent } from './alternativeconnections.component';

describe('AlternativeconnectionsComponent', () => {
  let component: AlternativeconnectionsComponent;
  let fixture: ComponentFixture<AlternativeconnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativeconnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeconnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
