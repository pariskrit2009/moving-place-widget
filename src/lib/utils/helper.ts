export function truncateMidLine(text: string, limit = 180) {
  return text.length > limit ? text.slice(0, limit - 3) + "..." : text;
}

export function stripNullish<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => !!value),
  ) as Partial<T>;
}
