import { Component } from '@angular/core';

@Component({
  selector: 'app-global-banner',
  standalone: true,
  imports: [],
  templateUrl: './global-banner.component.html',
  styleUrl: './global-banner.component.css'
})
export class GlobalBannerComponent {
  slides: string[];
  i: number;

  constructor() {
    this.i = 0;
    this.slides = [
      './bannerimages/ad1.png',
      './bannerimages/ad2.png',
      './bannerimages/ad3.png',
      './bannerimages/ad4.png',
    ];
  }
  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.i == 0 ? (this.i = this.slides.length - 1) : this.i--;
  }

  getNext() {
    this.i < this.slides.length - 1 ? this.i++ : (this.i = 0);
  }
}

