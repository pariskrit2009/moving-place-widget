import { get } from "@/lib/api/client";
import type {
  ServiceProviderListResponse,
  ServiceProviderParams,
} from "./types";

export async function getServiceProviders(
  params: ServiceProviderParams,
): Promise<ServiceProviderListResponse> {
  return get<ServiceProviderListResponse>("/service-providers/helper-list/", {
    params,
  });
}
