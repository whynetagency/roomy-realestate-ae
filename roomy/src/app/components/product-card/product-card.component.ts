import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() products: any[] | undefined;
  images: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      window.location.reload();
    })
    this.products?.forEach(p => {
      this.images.push({id: p._id, count: p.pictures.length, active: 0})
    })
  }

  onGetPhoto(item: any) {
    const index = this.images.find(i => i.id === item._id).active;
    return (item.pictures[index].original ? item.pictures[index].original : item.pictures[index].large);
  }

  onChangePhoto(item: any, direction: 'prev' | 'next'): void {
    let product = this.images.find(i => i.id === item._id);
    if(direction === 'prev') {
      product.active === 0 ? product.active = product.count-1 : product.active--;
    } else {
      product.active === product.count-1 ? product.active = 0 : product.active++;
    }
  }
}
