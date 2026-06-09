import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { config as configuration } from "@/lib/config";

// Create centralized axios instance
const axiosInstance = axios.create({
  baseURL: configuration.apiBaseUrl,
  // timeout: configuration.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply retry logic with exponential backoff
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx server errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ?? 0) >= 500
    );
  },
});

// Request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    // Extract widgetKey from URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const publicToken = searchParams.get("publicToken");
    config.headers["Authorization-Token"] = configuration.apiAuthorizationToken; // DELETE THIS LATER AFTER BACKEND SERVER DEPLOYED

    /** UNCOMMENT THIS AFTER BACKEND SERVER DEPLOYED, ALSO THE VALUES SHOULD BE PASSED FROM THE PARTNER SITE **/
    // const partnerDomain = searchParams.get("partnerDomain");
    config.headers["X-Widget-Domain"] = "www.affiliate301-demo.com";
    config.headers["X-Public-Token"] =
      "pk_test_301_4E81FC3AC234449BA4A4A366AD55E65D";

    // Add publicToken to headers if present
    if (publicToken) {
      config.headers = config.headers || {};
    }

    // Log request details for debugging
    console.log(
      `[Axios Request] ${config.method?.toUpperCase()} ${config.url}`,
      {
        params: config.params,
        hasData: !!config.data,
        hasAuth: !!publicToken,
      },
    );

    return config;
  },
  (error: AxiosError) => {
    console.error("[Axios Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error logging
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(
      `[Axios Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        duration: response.headers["x-response-time"],
      },
    );
    return response;
  },
  (error: AxiosError) => {
    // Log detailed error information
    if (error.response) {
      // Server responded with error status
      console.error("[Axios Response Error]", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        retryCount: error.config?.["axios-retry"]?.retryCount || 0,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error("[Axios Network Error]", {
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
        code: error.code,
      });
    } else {
      // Error in request configuration
      console.error("[Axios Config Error]", {
        message: error.message,
        config: error.config,
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

// Export types for better TypeScript support
export type AxiosInstanceType = typeof axiosInstance;
