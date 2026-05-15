// Google Places API (New) TypeScript definitions

// ---- Autocomplete Types ----

export interface AutocompleteRequest {
  input: string;
  sessionToken: string;
  locationBias?: {
    circle: {
      center: { latitude: number; longitude: number };
      radius: number;
    };
  };
  languageCode?: string;
  regionCode?: string;
  includedPrimaryTypes?: string[];
}

export interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
}

export interface AutocompleteSuggestion {
  placePrediction: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: { startOffset: number; endOffset: number }[];
    };
    structuredFormat: {
      mainText: {
        text: string;
        matches: { startOffset: number; endOffset: number }[];
      };
      secondaryText: { text: string };
    };
    types: string[];
  };
}

// ---- Place Details Types ----

export interface PlaceDetailsResponse {
  id: string;
  displayName?: { text: string; languageCode: string };
  formattedAddress?: string;
  addressComponents?: AddressComponent[];
  location?: { latitude: number; longitude: number };
}

export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
  languageCode?: string;
}

// ---- Application-level types ----

export interface SelectedPlace {
  placeId: string;
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}
