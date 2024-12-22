export interface favoriteRooms {
  id: number;
  name: string;
  hotelId: number;
  pricePerNight: number;
  available: boolean;
  maximumGuests: number;
  roomTypeId: number;
  bookedDates: favoriteRoomsBookedDate[];
  images: favoriteRoomsImage[];
}

export interface favoriteRoomsBookedDate {
  id: number;
  date: string;
  roomId: number;
}

export interface favoriteRoomsImage {
  id: number;
  source: string;
  roomId: number;
}
