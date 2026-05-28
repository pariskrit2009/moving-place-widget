type LoaderConfig = {
  publicToken: string;
  partnerDomain: string;
  containerId: string;
  widgetOrigin: string;
  apiUrl?: string;
  theme?: string;
  primaryColor?: string;
  secondaryColor?: string;
  height?: string;
};

function getCurrentScript(): HTMLScriptElement | null {
  return document.currentScript as HTMLScriptElement | null;
}

function readConfig(script: HTMLScriptElement): LoaderConfig | null {
  const publicToken = script.dataset.publicToken;
  const partnerDomain = script.dataset.partnerDomain;
  const containerId = script.dataset.containerId || "moving-place-widget";
  const widgetOrigin = script.dataset.widgetOrigin || "";
  const apiUrl = script.dataset.apiUrl;
  const theme = script.dataset.theme || "light";
  const primaryColor = script.dataset.primaryColor;
  const secondaryColor = script.dataset.secondaryColor;
  const height = script.dataset.height || "";

  if (!publicToken) {
    console.error("[MovingPlaceWidget] Missing data-public-token");
    return null;
  }

  if (!partnerDomain) {
    console.error("[MovingPlaceWidget] Missing data-partner-domain");
    return null;
  }

  return {
    publicToken,
    partnerDomain,
    containerId,
    widgetOrigin,
    apiUrl,
    theme,
    primaryColor,
    secondaryColor,
    height,
  };
}

function createIframe(config: LoaderConfig): HTMLIFrameElement {
  const params = new URLSearchParams({
    publicToken: config.publicToken,
    partnerDomain: config.partnerDomain,
    theme: config.theme || "light",
    hostOrigin: window.location.origin,
  });

  if (config.primaryColor) {
    params.set("primaryColor", config.primaryColor);
  }

  const iframe = document.createElement("iframe");
  iframe.src = `${config.widgetOrigin}/?${params.toString()}`;
  iframe.style.width = "100%";
  iframe.style.height = config.height || "640px";
  iframe.style.border = "0";
  iframe.style.display = "block";
  iframe.style.borderRadius = "16px";
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("title", "Moving Place Widget");

  return iframe;
}

async function mount() {
  const script = getCurrentScript();
  if (!script) {
    console.error("[MovingPlaceWidget] Could not find current script");
    return;
  }

  const config = readConfig(script);
  if (!config) return;

  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(
      `[MovingPlaceWidget] Container #${config.containerId} not found`,
    );
    return;
  }

  // Validate widget key if API URL is provided
  // if (config.apiUrl) {
  //   showLoadingState(container);

  //   const isValid = await validateWidgetKey(config.apiUrl, config.widgetKey);

  //   if (!isValid) {
  //     showErrorMessage(container);
  //     console.error("[MovingPlaceWidget] Widget key validation failed");
  //     return;
  //   }
  // } else {
  //   console.warn(
  //     "[MovingPlaceWidget] No data-api-url provided, skipping validation",
  //   );
  // }

  const iframe = createIframe(config);
  container.innerHTML = ""; // Clear loading state
  container.appendChild(iframe);

  window.addEventListener("message", (event: MessageEvent) => {
    if (event.origin !== config.widgetOrigin) return;
    if (!event.data || typeof event.data !== "object") return;

    if (event.data.type === "WIDGET_RESIZE") {
      iframe.style.height = `${event.data.payload.height}px`;
    }

    if (event.data.type === "WIDGET_COMPLETE") {
      console.log("[MovingPlaceWidget] Flow completed", event.data.payload);
    }
  });
}

mount();
