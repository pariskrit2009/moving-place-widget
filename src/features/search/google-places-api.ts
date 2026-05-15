import googlePlacesAxios from "@/lib/google-places/axios-instance";
import { getSessionToken, consumeSessionToken } from "@/lib/google-places/session-token";
import type {
  AutocompleteResponse,
  PlaceDetailsResponse,
} from "@/lib/google-places/types";

const FIELD_MASK =
  "id,displayName,formattedAddress,addressComponents,location";

export async function autocompletePlaces(
  input: string,
): Promise<AutocompleteResponse> {
  const { data } = await googlePlacesAxios.post<AutocompleteResponse>(
    "places:autocomplete",
    {
      input,
      sessionToken: getSessionToken(),
      languageCode: "en",
      regionCode: "US",
    },
  );
  return data;
}

export async function fetchPlaceDetails(
  placeId: string,
): Promise<PlaceDetailsResponse> {
  const sessionToken = consumeSessionToken();
  const { data } = await googlePlacesAxios.get<PlaceDetailsResponse>(
    `places/${placeId}`,
    {
      params: { sessionToken },
      headers: { "X-Goog-FieldMask": FIELD_MASK },
    },
  );
  return data;
}
