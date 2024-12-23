export interface Rooms {
  id: number;
  name: string;
  hotelId: number;
  pricePerNight: number;
  available: boolean;
  maximumGuests: number;
  roomTypeId: number;
  bookedDates: RoomsBookedDate[];
  images: RoomsImage[];
}

export interface RoomsBookedDate {
  id: number;
  date: string;
  roomId: number;
}

export interface RoomsImage {
  id: number;
  source: string;
  roomId: number;
}
