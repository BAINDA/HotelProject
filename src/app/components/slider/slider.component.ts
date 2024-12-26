import { NgFor } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  DoCheck,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [NgFor],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
})
export class SliderComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() images: string[] = []; // Accept images as an input
  @ViewChild('sliderContainer', { static: false }) sliderContainer!: ElementRef;
  currentSlide: number = 0;
  slideWidth: number = 0;
  slideInterval: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  ngAfterViewInit() {
    if (this.sliderContainer) {
      this.slideWidth = this.sliderContainer.nativeElement.clientWidth;
      this.cdRef.detectChanges();
    }
  }

  ngDoCheck() {
    if (
      this.sliderContainer &&
      this.sliderContainer.nativeElement.clientWidth !== this.slideWidth
    ) {
      this.slideWidth = this.sliderContainer.nativeElement.clientWidth;
      this.cdRef.detectChanges();
    }
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  getSliderTransform(): string {
    return `translateX(-${this.currentSlide * this.slideWidth}px)`;
  }
}
