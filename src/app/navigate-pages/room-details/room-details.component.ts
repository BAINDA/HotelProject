import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Rooms, RoomsImage } from '../../interfaces/rooms-interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('sliderContainer', { static: false }) sliderContainer!: ElementRef;

  roomsDetails: Rooms | null = null;
  roomsImages: RoomsImage[] = [];
  currentSlide: number = 0;
  slideInterval: any; // To hold the interval reference

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const roomId = this.activatedRoute.snapshot.paramMap.get('id');
    if (roomId) {
      this.getRoomDetails(+roomId);
    }

    // Start the automatic slider every 5 seconds
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  getRoomDetails(roomId: number) {
    this.apiService.getRoomById(roomId).subscribe({
      next: (data) => {
        this.roomsDetails = data;
        this.roomsImages = data.images.map((image: any) => image.source);
      },
      error: (error) => {
        console.error('Error fetching room details', error);
      },
    });
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.roomsImages.length;
  }

  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.roomsImages.length) %
      this.roomsImages.length;
  }

  // Get the transform CSS to move the slider
  getSliderTransform(): string {
    if (this.sliderContainer) {
      const slideWidth = this.sliderContainer.nativeElement.clientWidth;
      return `translateX(-${this.currentSlide * slideWidth}px)`;
    }
    return 'translateX(0)';
  }

  // Start the automatic slide change every 5 seconds
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.next(); // Move to the next slide
    }, 5000); // Every 5 seconds
  }
}
