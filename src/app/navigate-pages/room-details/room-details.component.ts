import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { Rooms, RoomsImage } from '../../interfaces/rooms-interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit, DoCheck
{
  roomFeatures: { icon: string; description: string }[] = [
    { icon: 'fa-solid fa-bed', description: 'Double Bed' },
    { icon: 'fa-solid fa-wifi', description: 'Free Wi-Fi' },
    { icon: 'fa-regular fa-newspaper', description: 'Free Newspaper' },
    { icon: 'fa-solid fa-sun', description: 'Beach View' },
    { icon: 'fa-solid fa-users', description: '2 Guests Capacity' },
    { icon: 'fa-solid fa-bacon', description: 'Breakfast Included' },
    { icon: 'fa-solid fa-window-maximize', description: 'Private Balcony' },
    { icon: 'fa-solid fa-tv', description: 'Flat-Screen TV' },
    { icon: 'fa-solid fa-hot-tub', description: 'Jacuzzi' },
    { icon: 'fa-solid fa-fan', description: 'Air Conditioning' },
    { icon: 'fa-solid fa-cocktail', description: 'Mini Bar' },
    { icon: 'fa-solid fa-concierge-bell', description: 'Room Service' },
  ];

  @ViewChild('sliderContainer', { static: false }) sliderContainer!: ElementRef;

  roomsDetails: Rooms | null = null;
  roomsImages: RoomsImage[] = [];
  currentSlide: number = 0;
  slideWidth: number = 0; // Store slide width
  slideInterval: any; // To hold the interval reference

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
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

  ngAfterViewInit() {
    // Initialize the slideWidth after the view has been initialized
    if (this.sliderContainer) {
      this.slideWidth = this.sliderContainer.nativeElement.clientWidth;
      this.cdRef.detectChanges(); // Trigger change detection after initialization
    }
  }

  ngDoCheck() {
    // Recalculate the slideWidth if the container's size has changed
    if (
      this.sliderContainer &&
      this.sliderContainer.nativeElement.clientWidth !== this.slideWidth
    ) {
      this.slideWidth = this.sliderContainer.nativeElement.clientWidth;
      this.cdRef.detectChanges(); // Trigger change detection again
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

  // Compute the transform for the slider position
  getSliderTransform(): string {
    return `translateX(-${this.currentSlide * this.slideWidth}px)`;
  }

  // Start the automatic slide change every 5 seconds
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.next(); // Move to the next slide
    }, 5000); // Every 5 seconds
  }
}
