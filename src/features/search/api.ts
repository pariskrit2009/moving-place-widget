import { get } from "@/lib/api/client";
import type { PlaceSearchResponse } from "./types";

// API functions for locations feature
export async function searchPlaces(query: string) {
  return get<PlaceSearchResponse>("/places/autocomplete", {
    params: { q: query },
  });
}
