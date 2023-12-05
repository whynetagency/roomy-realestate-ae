import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
