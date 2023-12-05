import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IToken, ITokenText} from "../models/token.model";
import * as dayjs from "dayjs";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingAuthService {

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore
  ) {}

  localToken = localStorage.getItem('token');
  baseApi = 'https://satoshi-cors.herokuapp.com/https://booking.guesty.com/api'; // live
  // baseApi = 'https://cors-anywhere.herokuapp.com/https://booking.guesty.com/api'; // local

  headers = {
    Accept: 'application/json; charset=utf-8',
    'content-type': 'application/json',
    authorization: `Bearer ${this.localToken ? JSON.parse(this.localToken).access_token : ''}`
  }

  private token$ = new BehaviorSubject(localStorage['token'] || null);

  getGuestToken(): Observable<any> {
    return this.token$.asObservable();
  }

  setGuestToken(token: string): void {
    localStorage.setItem('token', token);
    this.headers.authorization = `Bearer ${JSON.parse(token).access_token}`;
    this.token$.next(token);
  }

  getToken() {
    if (this.localToken) {
      if ((JSON.parse(this.localToken).expires_in < dayjs().valueOf()) || !JSON.parse(this.localToken).access_token) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post<ITokenText>('https://roomy-guesty.herokuapp.com/token', {headers: headers})
          .subscribe((resp: ITokenText) => {
            const token: IToken = {
              access_token: resp.text.access_token,
              expires_in: dayjs().add(resp.text.expires_in, 'seconds').valueOf(),
              scope: resp.text.scope,
              token_type: resp.text.token_type
            }

            this.setGuestToken(JSON.stringify(token));
            this.localToken = JSON.stringify(token);

            this.afs
              .collection('tools')
              .doc('token')
              .set(token)
              .then();
          })
      } else {
        // console.log(JSON.parse(this.localToken).access_token)
      }
    } else {
      this.afs
        .collection('tools')
        .doc('token')
        .get()
        .subscribe(resp => {
          this.setGuestToken(JSON.stringify(resp.data()));
          this.localToken = JSON.stringify(resp.data());
          this.getToken();
        });
    }
  }

  getListingsWithParams(checkIn: string, checkOut: string) {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('minOccupancy', 1);
    queryParams = queryParams.append('checkIn', checkIn);
    queryParams = queryParams.append('checkOut', checkOut);
    queryParams = queryParams.append('limit', 20);

    return this.http.get(`${this.baseApi}/listings/availability`, {headers: this.headers, params: queryParams})
  }

  getListingAvailabilityCalendar(from: string, to: string, listingId: string) {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('from', from);
    queryParams = queryParams.append('to', to);

    return this.http.get(`${this.baseApi}/listings/${listingId}/calendar`, {headers: this.headers, params: queryParams})
  }

  getPrecalculatedReservationPrice(id: string, checkIn: string, checkOut: string, guestsCount: string) {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('listingId', id);
    queryParams = queryParams.append('checkIn', checkIn);
    queryParams = queryParams.append('checkOut', checkOut);
    queryParams = queryParams.append('guestsCount', guestsCount);

    return this.http.get(`${this.baseApi}/reservations/money`, {headers: this.headers, params: queryParams})
  }

  createReservation(
    id: string,
    checkin: string,
    checkout: string,
    guests: string,
    firstName: string,
    lastName: string,
    creationDate: string,
    email: string,
    phone: string,
    token: string
  ) {
   const options = {
        reservation: {
          listingId: id,
          checkInDateLocalized: checkin,
          checkOutDateLocalized: checkout,
          guestsCount: guests ? guests : '1'
        },
        guest: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        },
        policy: {
          privacy: {
            version: 0,
            dateOfAcceptance: creationDate,
            isAccepted: true
          },
          termsAndConditions: {
            version: 0,
            dateOfAcceptance: creationDate,
            isAccepted: true
          },
          marketing: {
            dateOfAcceptance: creationDate,
            isAccepted: true
          }
        },
        payment: {token: token}
    }

    return this.http.post(`${this.baseApi}/reservations`, JSON.stringify(options), {headers: this.headers})
  }

  getReservationById(reservationId: string) {
    return this.http.get(`${this.baseApi}/reservations/${reservationId}`, {headers: this.headers})
  }

  getAllListings() {
    return this.http.get(`${this.baseApi}/listings`, {headers: this.headers})
  }

  getSpecificListing(id : string) {
    return this.http.get(`${this.baseApi}/listings/${id}`, {headers: this.headers})
  }

  getReviews(id?: string) {
    if (id) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('listingId', id);
      return this.http.get(`${this.baseApi}/reviews`, {headers: this.headers, params: queryParams})
    } else {
      return this.http.get(`${this.baseApi}/reviews`, {headers: this.headers})
    }
  }
}



/*const options = {
  method: 'POST',
  headers: {
    accept: 'application/json; charset=utf-8',
    'content-type': 'application/json',
    authorization: 'Bearer eyJraWQiOiI4UkNhdVMtNG9YNnRkd19fbnBHNURiY0N2OE5oM3BoR1RZaDUtc1pzQ0Q4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkR1VnJJSFZvQldyS3Q3MXFhbFk0T3NZdVBUMXhDa3ozZi0xalBkZUxzRWsiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE2NjM4NDQ4MzcsImV4cCI6MTY2MzkzMTIzNywiY2lkIjoiMG9hNmc1MXVtYVhsR0VRMkE1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2E2ZzUxdW1hWGxHRVEyQTVkNyIsImFjY291bnRJZCI6IjYyZTdkY2RjM2Y4MDM4MDAzM2IzMGM3OCIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImFkbWluIl19fV0sImlhbSI6InYzIiwiYXBwbGljYXRpb25JZCI6IjBvYTZnNTF1bWFYbEdFUTJBNWQ3In0.VdI3egLTbCbV2vE9dbN5JR0wGxm5nyA8WXQoAmNJJyJzxvfFn5mfr17fC0SeoY4kfUvgd2MgOH5ymnS1xIB2JkCU_D3FaettWF4NXr75P72aixbXyXzMfoHx8R429y0zBtOkp5fP-tfyJhR1sO-1SHMNUuS0pMDC78QdfNj1JLw2jnVMWlXcyTB0MDOJWz7eMaD7aX4y5fTElwplLRRFwWyXiOG0V5IntFlkGt2TEU60E2CCeTcpYg4IAjx8-FXFRjtEI3pkg-KJ0OEvIo4yFWfFKawvkBVaIPXekmf61Kp5OAEJ-VKOZ550S3SG_7fig2yiLt7FojahLoMsAMgfkQ'
  },
  body: JSON.stringify({
    reservation: {
      listingId: '62f8a77ac8a6ee003818eed8',
      checkInDateLocalized: '2022-10-06',
      checkOutDateLocalized: '2022-11-20',
      guestsCount: '1'
    },
    guest: {firstName: 'asd', lastName: 'asd', email: 'asd@dsf.asdf', phone: '12341234'},
    policy: {privacy: {version: 2, dateOfAcceptance: '1', isAccepted: true}},
    payment: {token: 'tok_1Lko0dC5GNPWFcdAxRwxdoaY'}
  })
};

fetch('https://booking.guesty.com/api/reservations', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));*/
