import {Component, Input, OnInit} from '@angular/core';
import {IReview} from "../../shared/models/review.model";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() reviewItem!: IReview;
  public nameAbr: any;
  /*public reviewItem = {
    name: 'Umair Javaid',
    date: '01 Nov 2020',
    rent: 'Upgraded Interiors 1Bed in Bluewaters Island',
    duration: 2,
    text: 'Spent a week here and it was amazing! I wish I could stay longer.Apartment is new and very clean.\n' +
          'Team disinfected and sanitized before my arrival! Will book this apartment next time for sure.',
    rate: 5
  }*/
  constructor() { }

  ngOnInit(): void {
    this.nameAbr = this.reviewItem.name
      .split(' ')
      .map(el => { return el.charAt(0) })
      .join('')
      .toUpperCase();
  }
}
