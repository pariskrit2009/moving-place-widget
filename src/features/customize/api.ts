import { post } from "@/lib/api";
import type {
  MarketplaceQuoteRequest,
  MarketplaceQuoteResponse,
} from "./schema";

export async function createMarketplaceQuoteCheckout(
  data: MarketplaceQuoteRequest,
) {
  return post<MarketplaceQuoteResponse>("/quote/marketplace-lfs/", data);
}
