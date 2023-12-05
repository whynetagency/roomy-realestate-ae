import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SlickCarouselComponent} from "ngx-slick-carousel";
import {IReview} from "../../shared/models/review.model";

@Component({
  selector: 'app-review-carousel',
  templateUrl: './review-carousel.component.html',
  styleUrls: ['./review-carousel.component.scss']
})
export class ReviewCarouselComponent implements OnInit {
  @Input() reviews!: IReview[];
  @ViewChild('slickModal', { static: true }) slickModal!: SlickCarouselComponent;
  slideConfigReview = {
    adaptiveHeight: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  };
  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }
}
