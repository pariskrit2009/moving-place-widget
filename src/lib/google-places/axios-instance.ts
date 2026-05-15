import axios from "axios";
import { config } from "@/lib/config";

const googlePlacesAxios = axios.create({
  baseURL: config.googlePlacesBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach API key header to every request
googlePlacesAxios.interceptors.request.use(
  (requestConfig) => {
    requestConfig.headers["X-Goog-Api-Key"] = config.googlePlacesApiKey;

    console.log(
      `[Google Places] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`,
      {
        params: requestConfig.params,
        hasData: !!requestConfig.data,
      },
    );

    return requestConfig;
  },
  (error) => {
    console.error("[Google Places Request Error]", error);
    return Promise.reject(error);
  },
);

// Log response errors without retrying (avoid billing spikes)
googlePlacesAxios.interceptors.response.use(
  (response) => {
    console.log(
      `[Google Places Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
      { status: response.status },
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("[Google Places API Error]", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("[Google Places Network Error]", {
        url: error.config?.url,
        message: error.message,
      });
    }
    return Promise.reject(error);
  },
);

export default googlePlacesAxios;
