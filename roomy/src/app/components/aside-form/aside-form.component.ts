import {Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {BookingAuthService} from "../../shared/services/booking-auth.service";
import {Router} from "@angular/router";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {StripeService} from "ngx-stripe";
import {Stripe, loadStripe} from "@stripe/stripe-js";
import {HttpClient} from "@angular/common/http";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-aside-form',
  templateUrl: './aside-form.component.html',
  styleUrls: ['./aside-form.component.scss']
})
export class AsideFormComponent implements OnInit {

  private stripe = loadStripe('pk_test_51KWF4MC5GNPWFcdAY1OSUg7DkPniZ6QVGYeiOHpAz06QROcAnAc7sb9Ls22M07orb8qazhB7GeeRsbomMxprbLNy00RM5zAqVP');
  isReservation = false;
  isScreenLg!: boolean;
  @Input() price!: number;
  @Input() minNights!: number;
  @Input() accommodates!: number;
  @ViewChild('successBanner') successBanner!: TemplateRef<any>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.innerWidth >= 992 ? this.isScreenLg = true : this.isScreenLg = false;
  }

  card: any;
  id!: string;
  checkin!: string;
  checkout!: string;
  guests!: string;
  isReservationSuccess = false;
  isLoading = false;
  isCalculating = false;

  modalRef?: BsModalRef;
  paymentForm : FormGroup = new FormGroup({
    "userFirstName": new FormControl('', [Validators.required, Validators.pattern("^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$")]),
    "userLastName": new FormControl('', [Validators.required, Validators.pattern("^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$")]),
    "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    "phone": new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
  });

  maxGuests: number[] = []
  subTotalPrice: number = 0
  totalNights: number = 0;
  myForm!: UntypedFormGroup;
  formatDatePipe = new DateFormatPipe();
  isCardConfirmed = false;
  confirmationCode!: string;
  minDate = new Date();
  availableDates: Date[] = [];
  errorMessage?: string;

  constructor(
    private bookingAuthService: BookingAuthService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    window.innerWidth >= 992 ? this.isScreenLg = true : this.isScreenLg = false;
  }

  ngOnInit(): void {
    this.createPaymentForm();
    this.id = this.router.url.split('/').pop() || '';
    this.myForm = this.formBuilder.group({
      dates: this.formBuilder.control([]),
      guests: ''
    });
    this.myForm.valueChanges.subscribe(value => {
      this.checkin = this.formatDatePipe.transform(value.dates[0]);
      this.checkout = this.formatDatePipe.transform(value.dates[1]);
      this.guests = value.guests || 1;
      if (this.checkin && this.checkout) {
        this.isCalculating = true;
        this.bookingAuthService
          .getPrecalculatedReservationPrice(this.id, this.checkin, this.checkout, this.guests).subscribe((resp: any) => {
          this.subTotalPrice = resp.money.subTotalPrice;
          this.isCalculating = false;
        })
        this.totalNights = dayjs(this.checkout).diff(dayjs(this.checkin), 'day');
      }
    });
    this.maxGuests = [...Array(this.accommodates + 1).keys()];
    this.maxGuests.shift();

    this.bookingAuthService.getListingAvailabilityCalendar(dayjs(this.minDate).format('YYYY-MM-DD'), dayjs(this.minDate).add(1, 'year').format('YYYY-MM-DD'), this.id)
      .subscribe(resp => {
        for(let key in resp) {
          // @ts-ignore
          if (resp[key].status === 'available') {
            // @ts-ignore
            this.availableDates.push(new Date(resp[key].date))
          }
        }
      })
  }


  onReserve() {
    this.isReservation = true;
  }

  createPaymentForm() {
    const stripe = Stripe('pk_test_51KWF4MC5GNPWFcdAY1OSUg7DkPniZ6QVGYeiOHpAz06QROcAnAc7sb9Ls22M07orb8qazhB7GeeRsbomMxprbLNy00RM5zAqVP');
    const elements = stripe.elements();

    const style = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '35px',
        fontWeight: 300,
        fontFamily: 'inherit',
        fontSize: '16px',

        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    };

    const cardNumberElement = elements.create('cardNumber', {
      style: style
    });
    cardNumberElement.mount('#card-number-element');

    const cardExpiryElement = elements.create('cardExpiry', {
      style: style
    });
    cardExpiryElement.mount('#card-expiry-element');

    const cardCvcElement = elements.create('cardCvc', {
      style: style
    });
    cardCvcElement.mount('#card-cvc-element');


    const setOutcome = (result: any) => {

      if (result.token) {
        const firstName = this.paymentForm.get('userFirstName')?.value;
        const lastName = this.paymentForm.get('userLastName')?.value;
        const email = this.paymentForm.get('email')?.value;
        const phone = this.paymentForm.get('phone')?.value;
        const creationDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        if (this.paymentForm.valid) {
          this.isLoading = true;

          this.bookingAuthService
            .createReservation(
              this.id,
              this.checkin,
              this.checkout,
              this.guests,
              firstName,
              lastName,
              creationDate,
              email,
              phone,
              result.token.id
            ).subscribe((resp: any) => {
            this.bookingAuthService.getReservationById(resp._id).subscribe((bookingData: any) => {
              this.confirmationCode = resp.confirmationCode;
              if (bookingData.status) {
                this.modalRef = this.modalService.show(this.successBanner)
              }
              this.isLoading = false;
            })
          })
        } else if (result.error) {
          this.errorMessage = result.error.message;
          this.isLoading = false;
        }
      } else {
        this.errorMessage = result.error.message
      }
    }

    document.querySelector('form')?.addEventListener('submit', function(e) {
      e.preventDefault();
      stripe.createToken(cardNumberElement).then(setOutcome);
    });
  }
}
