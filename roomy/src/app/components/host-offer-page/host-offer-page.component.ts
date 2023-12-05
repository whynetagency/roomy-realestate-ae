import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TelegramApiService} from "../../shared/services/telegram-api.service";
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-host-offer-page',
  templateUrl: './host-offer-page.component.html',
  styleUrls: ['./host-offer-page.component.scss'],
})
export class HostOfferPageComponent implements OnInit {
  isSuccess = false;
  modalRef?: BsModalRef;
  propertyTypeTs = 'flat';
  flatRoomsCount = 1;
  villaRoomsCount = 3;
  generalRoomsCount = 0;
  isLoading = true;
  flatRooms = [
    {count: 1, text: '1 bedroom'},
    {count: 2, text: '2 bedroom'},
    {count: 3, text: '3 bedroom'},
    {count: 4, text: '4+ bedroom'},
  ];
  villaRooms = [
    {count: 3, text: '3 bedroom'},
    {count: 4, text: '4 bedroom'},
    {count: 5, text: '5+ bedroom'},
  ];
  updatedFlatRooms = this.flatRooms;
  districts = [
    'Al Barsha',
    'Al Furjan',
    'Bluewaters Island',
    'Business bay',
    'City Walk',
    'DIFC',
    'Downtown Dubai',
    'Dubai Marina',
    'JBR',
    'JLT',
    'Palm Jumeirah',
    'The Greens',
    'Arjan',
    'Arabic Ranches',
    'JVT JVC',
    'TECOM',
    'Meydan',
    'Sports City Impz',
    'Jumeirah Lake Towers',
    'Madinat',
    'Other'
  ]
  selectedDistrict = this.districts[0];

  /*price = {
    flat: {
      'Dubai Marina & JBR': {1: '12000.00', 2: '22000.00', 3: '28000.00', 4: '42000.00'},
      'Palm Jumeirah': {1: '15000.00', 2: '25000.00', 3: '40000.00', 4: '55000.00'},
      'Jumeirah Lake Towers': {1: '8736.00', 2: '14564.00', 3: '19217.00', 4: '25954.00'},
      'Madinat': {1: '18500.00', 2: '30000.00', 3: '42000.00'},
      'Downtown': {1: '13500.00', 2: '23800.00', 3: '38800.00', 4: '51000.00'}
    },
    villa: {3: '40178.00', 4: '50854.00', 5: '65227.00'}
  }*/

  constructor(
    private modalService: BsModalService,
    public telegram: TelegramApiService
  ) {
  }

  get possiblePrice(): string {
    if (this.propertyTypeTs === 'flat') {
      // @ts-ignore
      return this.price.flat[this.selectedDistrict][this.flatRoomsCount];
    } else {
      // @ts-ignore
      return this.price.villa[this.flatRoomsCount];
    }
  }

  ngOnInit(): void {
    AOS.init();
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  onChangePropertyType(type: string): void {
    this.propertyTypeTs = type
  }

  onChangeRoomsCount(e: any, type: string): void {
    //console.log(e.target.value)
    if (type === 'flat') {
      this.flatRoomsCount = Number(e.target.value);
      //console.log(this.flatRoomsCount)
      this.generalRoomsCount = this.flatRoomsCount;
    } else {
      this.villaRoomsCount = Number(e.target.value);
      this.generalRoomsCount = this.villaRoomsCount;
    }
  }

  onDistrictChange(e: any) {
    let maxRooms;
    let rooms;
    this.selectedDistrict = e.target.value;
    // @ts-ignore
    //maxRooms = +Object.keys(this.price.flat[this.selectedDistrict]).slice(-1).pop();
    rooms = [...this.flatRooms];
    this.updatedFlatRooms = rooms;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSend(template: TemplateRef<any>, name: string, phone: string, email: string, propertyType: string, district: string, rooms: string, details: string): void {
    const order = {name, phone, email, propertyType, district, rooms, details};
    this.telegram.onSend(order).subscribe(() => {
      this.modalService.hide();
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 3000)
    });
  }

  slideMove(event: any) {
    if (event.currentTarget.children[0].lastElementChild?.classList.contains('show')) {
      event.currentTarget.children[0].children[0].classList.add('panel-heading__active');
    } else {
      event.currentTarget.children[0].children[0].classList.remove('panel-heading__active');
    }
  }
}
