export interface PlaceSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface PlaceSearchResponse {
  suggestions: PlaceSuggestion[];
}
