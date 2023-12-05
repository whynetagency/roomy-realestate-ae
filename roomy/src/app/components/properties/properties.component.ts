import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {BehaviorSubject, Subject} from 'rxjs';
import {IconService} from '../../shared/services/icon.service';
import {Router} from '@angular/router';
import {FirestoreService} from '../../shared/services/firebase.service';
import {BookingAuthService} from '../../shared/services/booking-auth.service';
import {IReview} from "../../shared/models/review.model";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  public isLoading = true;
  public icons: any;
  zoom = 12
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    gestureHandling: 'cooperative',
    disableDoubleClickZoom: true,
    maxZoom: 100,
    minZoom: 1,
  }
  facilitiesFirstColumn: string[] = [];
  facilitiesSecondColumn: string[] = [];
  roomDetails: any;
  similarOffers: any[] = [];
  rules = [
    'Early check in and Late Check out are possible at an extra charge, subject to availability.',
    'Quiet hour starts at 10pm. We hold no responsibility for any complaints for the noise disturbance.',
    'For any maintenance emergencies, please contact the security of the building.',
    'All our apartments are non-smoking. Smoking is only permitted on the balcony.',
  ];
  currentSlide: Subject<number> = new BehaviorSubject(0);
  slides: any;

  reviews: IReview[] = [];

  marker: any;
  coords: any;
  showMoreParam: boolean = false;
  similarPropertiesSection!: HTMLElement;
  isScreenLg!: boolean;
  slideConfig: any;

  scrolled = 0;
  @ViewChild('slickModal', {static: true}) slickModal!: SlickCarouselComponent;

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.innerWidth >= 992 ? this.isScreenLg = true : this.isScreenLg = false;
  }

  constructor(
    private iconsMap: IconService,
    private router: Router,
    private fireService: FirestoreService,
    private bookingService: BookingAuthService
  ) {
    window.innerWidth >= 992 ? this.isScreenLg = true : this.isScreenLg = false;
    this.slideConfig = {
      infinite: true,
      slidesToShow: window.innerWidth >= 580 ? 2 : 1,
      slidesToScroll: window.innerWidth >= 580 ? 2 : 1,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 900,
      pauseOnFocus: false,
      pauseOnHover: false,
      lazyLoad: 'ondemand'
    };
  }

  ngOnInit(): void {
    this.icons = this.iconsMap.icons;
    const activeRoom = this.router.url.split('/').pop();

    // @ts-ignore
    this.bookingService.getSpecificListing(activeRoom).subscribe(res => {
      this.roomDetails = res;
      this.coords = {
        lat: this.roomDetails.address.lat,
        lng: this.roomDetails.address.lng,
      }
      this.marker = {
        position: {
          lat: this.roomDetails.address.lat,
          lng: this.roomDetails.address.lng,
        },
        title: this.roomDetails.title,
        options: {
          animation: google.maps.Animation.DROP,
          icon: '../assets/iconsInUse/location_1.png'
        }
      }
      this.isLoading = false;
    });
    this.bookingService.getReviews(activeRoom).subscribe((res: any) => {
      res.data.forEach((rev: any) => {
        if (rev.rawReview?.public_review || rev.rawReview?.content?.positive) {
          // @ts-ignore
          const rate = rev.rawReview?.overall_rating || Math.round((Object.values(rev.rawReview?.scoring).reduce((a, b) => a + b, 0) / Object.keys(rev.rawReview?.scoring).length) / 2);
          let review: IReview = {
            name: rev.rawReview?.reviewer?.name,
            date: dayjs(rev.rawReview?.created_timestamp?.split(' ')[0]).format('DD MMM YYYY'),
            rate: rate,
            content: rev.rawReview?.public_review || rev.rawReview?.content?.positive
          };
          this.reviews.push(review)
        }
      })
    })
    this.bookingService.getAllListings().subscribe((res: any) => {
      this.similarOffers = res.results.filter((room: any) => room._id !== activeRoom)
    })
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  showMore() {
    // this.similarPropertiesSection = document.querySelector('app-product-card') as HTMLElement;
    this.showMoreParam = !this.showMoreParam;
  }
}
