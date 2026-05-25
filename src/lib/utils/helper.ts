export function truncateMidLine(text: string, limit = 180) {
  return text.length > limit ? text.slice(0, limit - 3) + "..." : text;
}
