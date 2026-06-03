// Utility functions barrel export
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export { formatIsoDate } from "./date";
export { truncateMidLine, stripNullish } from "./helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
