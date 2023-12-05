import {Component, OnInit} from '@angular/core';
import { BookingAuthService } from "./shared/services/booking-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( private bookingAuthService: BookingAuthService) {}
  title = 'roomy';

  ngOnInit() {
    this.bookingAuthService.getToken();
  }
}
