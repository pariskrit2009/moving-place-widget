// Session token management for Google Places API billing optimization.
// Module-level state — not React state — because token changes must not trigger re-renders.

let currentToken: string | null = null;

function generateToken(): string {
  return crypto.randomUUID();
}

/** Returns the current session token, creating one if none exists. */
export function getSessionToken(): string {
  if (!currentToken) {
    currentToken = generateToken();
  }
  return currentToken;
}

/**
 * Returns the current token and immediately starts a new session.
 * Call this when fetching place details to close the billing session.
 */
export function consumeSessionToken(): string {
  const token = getSessionToken();
  currentToken = generateToken();
  return token;
}

/** Forces a new session token. Call when user clears the input. */
export function resetSessionToken(): void {
  currentToken = generateToken();
}
