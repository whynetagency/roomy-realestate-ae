import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
