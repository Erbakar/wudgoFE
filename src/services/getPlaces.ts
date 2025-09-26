import queryString from 'query-string';
import type { RoomDto } from '../contracts/RoomDto';
import { API_BASEURL, type ResponseModel } from './base';
import { useQuery } from '@tanstack/react-query';

export type PlaceSort = 'Default' | 'PriceAscending' | 'PriceDescending' | 'RatingAscending' | 'RatingDescending';

type Request = {
  query?: string | null;
  placeSort?: PlaceSort | null;
  pageIndex: number;
  pageLength: number;
  startTime?: string | Date | null;
  endTime?: string | Date | null;
  currency?: string | null;
  includeBlogPosts: boolean;
};

async function getPlaces(request: Request): Promise<[ResponseModel<RoomDto[]>, Response]> {
  const qs = queryString.stringify(request);

  const response = await fetch(`${API_BASEURL}/api/places?${qs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  try {
    const result = await response.json();
    return [result as ResponseModel<RoomDto[]>, response];
  }
  catch {
    return [{
      isSuccessful: false,
      errors: [
        "Unexpected error"
      ]
    }, response];
  }
}

export function usePlaces(request: Request) {
  return useQuery({
    queryKey: ["places", request],
    queryFn: () => {
      return getPlaces(request);
    }
  })
}

