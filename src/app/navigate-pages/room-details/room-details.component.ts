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
  // Define room features with icons and descriptions
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

  roomsDetails: Rooms | null = null; // Holds room details fetched from the API
  roomsImages: RoomsImage[] = []; // Holds room images fetched from the API
  currentSlide: number = 0; // Holds the current slide index for the image slider
  slideWidth: number = 0; // Store slide width
  slideInterval: any; // To hold the interval reference
  currentDate: string = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  constructor(
    private activatedRoute: ActivatedRoute, // ActivatedRoute to get route parameters
    private apiService: ApiService, // ApiService for API requests
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const roomId = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve room ID from the URL
    if (roomId) {
      this.getRoomDetails(+roomId); // Fetch room details if ID is found
    }
    this.startAutoSlide(); // Start the automatic slider
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // Clear the interval when the component is destroyed
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

  // Fetch room details based on room ID
  getRoomDetails(roomId: number) {
    this.apiService.getRoomById(roomId).subscribe({
      next: (data) => {
        this.roomsDetails = data; // Set room details if request is successful
        this.roomsImages = data.images.map((image: any) => image.source); // Extract image sources
        console.log(this.roomsDetails); // Log room details for debugging
      },
      error: (error) => {
        console.error('Error fetching room details', error); // Log error if request fails
      },
    });
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

  // Move to the next slide
  next() {
    this.currentSlide = (this.currentSlide + 1) % this.roomsImages.length;
  }

  // Move to the previous slide
  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.roomsImages.length) %
      this.roomsImages.length;
  }
}
