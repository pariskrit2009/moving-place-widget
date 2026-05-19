import type { MoveOption } from "./schema";

function canUseTruckOption(params: {
  startLocation?: unknown;
  endLocation?: unknown;
  hasDifferentDates?: boolean;
}) {
  return !!(
    params.startLocation &&
    params.endLocation &&
    !params.hasDifferentDates
  );
}

function reconcileMoveOption(params: {
  current: MoveOption | null;
  canUseTruck: boolean;
}): MoveOption | null {
  const { current, canUseTruck } = params;

  // no prior selection → don't auto-pick
  if (!current) {
    return null;
  }

  // invalid previous selection → fallback
  if (current === "movers-truck" && !canUseTruck) {
    return "movers-only";
  }

  return current;
}

export { canUseTruckOption, reconcileMoveOption };
