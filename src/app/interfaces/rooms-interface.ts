export interface RoomDetails {
  id: number;
  name: string;
  hotelId: number;
  pricePerNight: number;
  available: boolean;
  maximumGuests: number;
  roomTypeId: number;
  bookedDates: BookedDate[];
  images: RoomImage[];
}

export interface BookedDate {
  id: number;
  date: string;
  roomId: number;
}

export interface RoomImage {
  id: number;
  source: string;
  roomId: number;
}
