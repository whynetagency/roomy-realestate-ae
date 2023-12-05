import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostOfferPageComponent } from './host-offer-page.component';

describe('HostOfferPageComponent', () => {
  let component: HostOfferPageComponent;
  let fixture: ComponentFixture<HostOfferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostOfferPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostOfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
