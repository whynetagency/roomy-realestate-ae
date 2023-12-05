import {Component, OnInit, ViewChild} from '@angular/core';
import {SlickCarouselComponent} from "ngx-slick-carousel";
import {FirestoreService} from "../../shared/services/firebase.service";
import {BookingAuthService} from "../../shared/services/booking-auth.service";
import * as dayjs from "dayjs";
import {filter} from "rxjs";
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {IReview} from "../../shared/models/review.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rooms: any[] | undefined;

  public isLoading = true;

  slideConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  };

  bsValue = new Date();
  myForm!: UntypedFormGroup;
  maxDate = new Date();
  minDate = new Date();
  maxGuests: number = 1;
  reviews: IReview[] = [];
  public districts: string[] = ['All Dubai'];

  @ViewChild('slickModal', {static: true}) slickModal!: SlickCarouselComponent;

  constructor(
    private fireService: FirestoreService,
    private bookingService: BookingAuthService,
    private formBuilder: FormBuilder,
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      district: 'All Dubai',
      dates: this.formBuilder.control([]),
      guests: 1
    });
    this.bookingService.getGuestToken()
      .pipe( filter(resp => resp && JSON.parse(resp).access_token))
      .subscribe(resp => {
        this.bookingService.getAllListings().subscribe((res: any) => {
          this.rooms = res.results;
          this.isLoading = false;
          this.rooms?.forEach((room: any) => {
            this.districts.push(room.address.street);
            if (room.accommodates > this.maxGuests) {
              this.maxGuests = room.accommodates;
            }
          })
        })
      })
    this.bookingService.getReviews().subscribe((res: any) => {
      res.data.forEach((rev: any) => {
        if (rev.rawReview?.public_review || rev.rawReview?.content?.positive) {
          // @ts-ignore
          const rate = rev.rawReview?.overall_rating || Math.round((Object.values(rev.rawReview?.scoring).reduce((a, b) => a + b, 0) / Object.keys(rev.rawReview?.scoring).length) / 2);
          let review: IReview = {
            name: rev.rawReview?.reviewer?.name || rev.channelId,
            date: dayjs(rev.rawReview?.created_timestamp?.split(' ')[0]).format('DD MMM YYYY') || dayjs(rev.createdAt?.split('T')[0]).format('DD MMM YYYY'),
            rate: rate,
            content: rev.rawReview?.public_review || rev.rawReview?.content?.positive
          };
          this.reviews.push(review)
        }
      })
    })
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  increment() {
    if (this.myForm.controls['guests'].value < this.maxGuests) {
      this.myForm.controls['guests'].setValue(this.myForm.controls['guests'].value + 1)
    }
  }

  decrement() {
    if (this.myForm.controls['guests'].value > 1)
      this.myForm.controls['guests'].setValue(this.myForm.controls['guests'].value - 1)
  }

  search() {
    this.isLoading = true;
    const selectedDates = [...this.myForm.controls['dates'].value.map((date: string) => {
      return dayjs(date).format('YYYY-MM-DD');
    })];
    this.bookingService.getListingsWithParams(selectedDates[0], selectedDates[1]).subscribe((availableRooms: any) => {
      console.log(availableRooms)
      this.rooms = availableRooms.results.filter((room: any) =>
        this.myForm.controls['district'].value !== 'All Dubai'
          ? room.accommodates >= this.myForm.controls['guests'].value && room.address.street === this.myForm.controls['district'].value
          : room.accommodates >= this.myForm.controls['guests'].value);
      this.isLoading = false;
    })
  }
}
