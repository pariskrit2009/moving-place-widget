import { post } from "@/lib/api";
import type {
  MarketplaceLFSQuoteRequest,
  MarketplaceLOQuoteRequest,
  MarketplaceQuoteResponse,
} from "./schema";

export async function createMarketplaceQuoteCheckoutLFS(
  data: MarketplaceLFSQuoteRequest,
) {
  return post<MarketplaceQuoteResponse>("/moving/quote/marketplace-lfs/", data);
}

export async function createMarketplaceQuoteCheckoutLO(
  data: MarketplaceLOQuoteRequest,
) {
  return post<MarketplaceQuoteResponse>("/moving/quote/marketplace", data);
}
