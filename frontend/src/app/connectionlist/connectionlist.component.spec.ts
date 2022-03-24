import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionlistComponent } from './connectionlist.component';

describe('ConnectionlistComponent', () => {
  let component: ConnectionlistComponent;
  let fixture: ComponentFixture<ConnectionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
