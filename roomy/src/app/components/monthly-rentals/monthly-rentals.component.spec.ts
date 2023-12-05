import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRentalsComponent } from './monthly-rentals.component';

describe('MonthlyRentalsComponent', () => {
  let component: MonthlyRentalsComponent;
  let fixture: ComponentFixture<MonthlyRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyRentalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
