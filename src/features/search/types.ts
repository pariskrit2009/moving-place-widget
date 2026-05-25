export interface PlaceSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface PlaceSearchResponse {
  suggestions: PlaceSuggestion[];
}

export interface ReviewItem {
  id: string;
  name: string;
  description: string;
  rating: number;
  status: boolean;
}
