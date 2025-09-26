import type { AmenityDto } from './AmenityDto';
import type { CityDto } from './CityDto';
import type { CommentBaseDto } from './CommentDto';
import type { ExtraFeeDto } from './ExtraFeeDto';
import type { GeoLocationDto } from './GeoLocationDto';
import type { MoneyDto } from './MoneyDto';
import type { RoomRatingDto } from './RoomRatingDto';
import type { TagDto } from './TagDto';

export type RoomBaseDto = {
  type: string;
  id: number;
  name: string;
  url: string;
  description: string;
  address: string;
  pricePerNight: MoneyDto;
  cleaningFee: MoneyDto;
  amenities: AmenityDto[];
  tags: TagDto[];
  city: CityDto;

  bookmarkCount: number;
  totalReviews: number;
  rating: RoomRatingDto;
  isFavorite: boolean | null
  reviews: CommentBaseDto;
  location: GeoLocationDto;
  fees: ExtraFeeDto;
};

export type RoomDto = RoomBaseDto & {
  img: string;
};