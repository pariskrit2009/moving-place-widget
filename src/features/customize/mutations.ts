import { useMutation } from "@tanstack/react-query";
import { createMarketplaceQuoteCheckout } from "./api";
import type { AxiosError } from "axios";

export function useCreateMarketplaceQuoteCheckout() {
  return useMutation({
    mutationFn: createMarketplaceQuoteCheckout,
    onSuccess: (res) => {
      window.location.href = res.finishCheckoutUrl;
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
    },
  });
}
