import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRentalsComponent } from './event-rentals.component';

describe('EventRentalsComponent', () => {
  let component: EventRentalsComponent;
  let fixture: ComponentFixture<EventRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRentalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
