import type {
  AutocompleteSuggestion,
  SelectedPlace as GoogleSelectedPlace,
} from "@/lib/google-places/types";

export interface PlaceSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface PlaceSearchResponse {
  suggestions: PlaceSuggestion[];
}

export type SelectedPlace = GoogleSelectedPlace;

/** Maps a Google AutocompleteSuggestion to the app-level PlaceSuggestion. */
export function mapSuggestion(s: AutocompleteSuggestion): PlaceSuggestion {
  const pred = s.placePrediction;
  return {
    placeId: pred.placeId,
    description: pred.text.text,
    mainText: pred.structuredFormat.mainText.text,
    secondaryText: pred.structuredFormat.secondaryText.text,
  };
}
