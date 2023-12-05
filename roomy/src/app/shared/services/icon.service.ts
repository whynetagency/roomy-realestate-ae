import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  icons = {
    'Air conditioning': '../../assets/iconsInUse/air-conditioning.svg',
    'Bathtub': '../../assets/iconsInUse/bath.svg',
    'Bed linens': '../../assets/iconsInUse/bedlinens.svg',
    'Coffee maker': '../../assets/iconsInUse/coffee-maker.svg',
    'Carbon monoxide detector': '../../assets/iconsInUse/detectorCO2.svg',
    'Cookware': '../../assets/iconsInUse/cookware.svg',
    'Dryer': '../../assets/iconsInUse/clothes-dryer.svg',
    'Dishwasher': '../../assets/iconsInUse/dishwasher.svg',
    'Hair dryer': '../../assets/iconsInUse/dryer.svg',
    'Iron': '../../assets/iconsInUse/iron.svg',
    'Internet': '../../assets/iconsInUse/internet.svg',
    'Essentials': '../../assets/iconsInUse/pack.svg',
    'Elevator': '../../assets/iconsInUse/elevator.svg',
    'Extra pillows and blankets': '../../assets/iconsInUse/blanket.svg',
    'Hangers': '../../assets/iconsInUse/hanger.svg',
    'Hot water': '../../assets/iconsInUse/heater.svg',
    'EV charger': '../../assets/iconsInUse/ev-charger.svg',
    'Gym': '../../assets/iconsInUse/gym.svg',
    'Fire extinguisher': '../../assets/iconsInUse/fire-extinguisher.svg',
    'First aid kit': '../../assets/iconsInUse/first-aid-kit.svg',
    'Fireplace guards': '../../assets/iconsInUse/fireplace.svg',
    'Hot tub': '../../assets/iconsInUse/Hot-tub.svg',
    'Free parking on premises': '../../assets/iconsInUse/parking.svg',
    'Kitchen': '../../assets/iconsInUse/kitchen.svg',
    'Kettle': '../../assets/iconsInUse/kettle.svg',
    'Dishes and silverware': '../../assets/iconsInUse/curtley.svg',
    'Laptop friendly workspace': '../../assets/iconsInUse/workspace.svg',
    'Lake Front': '../../assets/iconsInUse/lake.svg',
    'Microwave': '../../assets/iconsInUse/microvawe.svg',
    'Private entrance': '../../assets/iconsInUse/entrance.svg',
    'Pets allowed': '../../assets/iconsInUse/pets.svg',
    'Refrigerator': '../../assets/iconsInUse/refrigerator.svg',
    'Patio or balcony': '../../assets/iconsInUse/balcony.svg',
    'Swimming pool': '../../assets/iconsInUse/pool.svg',
    'Stove': '../../assets/iconsInUse/stove.svg',
    'Smoke detector': '../../assets/iconsInUse/smoke-detector.svg',
    'Suitable for events': '../../assets/iconsInUse/events.svg',
    'Smoking allowed': '../../assets/iconsInUse/smoking.svg',
    'Shampoo': '../../assets/iconsInUse/shampoo.svg',
    'Suitable for children (2-12 years)': '../../assets/iconsInUse/playground.svg',
    'Suitable for infants (under 2 years)': '../../assets/iconsInUse/babyCot.svg',
    'TV': '../../assets/iconsInUse/tv.svg',
    'Cable TV': '../../assets/iconsInUse/tv.svg',
    'Toaster': '../../assets/iconsInUse/toaster.svg',
    'Towels provided': '../../assets/iconsInUse/towels.svg',
    'Oven': '../../assets/iconsInUse/oven.svg',
    'Washer': '../../assets/iconsInUse/wasing-mashine.svg',
    'Wireless Internet': '../../assets/iconsInUse/wifi.svg'
  };

  constructor() { }
}
