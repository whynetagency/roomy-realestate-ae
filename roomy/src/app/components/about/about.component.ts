import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

}
