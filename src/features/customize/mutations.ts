import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  createMarketplaceQuoteCheckoutLFS,
  createMarketplaceQuoteCheckoutLO,
} from "./api";

export function useCreateMarketplaceQuoteCheckoutLFS() {
  return useMutation({
    mutationFn: createMarketplaceQuoteCheckoutLFS,
    onSuccess: (res) => {
      window.location.href = res.finishCheckoutUrl;
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
    },
  });
}

export function useCreateMarketplaceQuoteCheckoutLO() {
  return useMutation({
    mutationFn: createMarketplaceQuoteCheckoutLO,
    onSuccess: (res) => {
      window.location.href = res.finishCheckoutUrl;
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
    },
  });
}
