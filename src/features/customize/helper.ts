export function buildLocation(
  step?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  },
  fallback?: string,
) {
  const location = [
    step?.address,
    step?.city,
    step?.state && `${step.state} ${step.zipCode}`,
  ]
    .filter(Boolean)
    .join(", ");

  return location || fallback || "";
}
