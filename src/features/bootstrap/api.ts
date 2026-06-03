import axiosInstance from "@/lib/api/axios-instance";

export async function fetchBootstrap(): Promise<void> {
  await axiosInstance.get("/auth/widget/bootstrap", {
    // Disable axios-retry so bootstrap fails fast
    "axios-retry": { retries: 0 },
  });
}
