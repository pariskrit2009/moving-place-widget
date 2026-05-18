import { useLocation } from "react-router-dom";

const routeStepMap: Record<string, number> = {
  "/": 1,
  "/location": 2,
  "/moving": 3,
  "/move-option": 4,
  "/movers": 5,
  "/all-movers": 5,
  "/customize": 6,
  "/quote": 7,
  "/checkout": 8,
};

export function useWidgetState() {
  const { pathname } = useLocation();
  const totalSteps = 8;
  const currentStep = routeStepMap[pathname] ?? 1;

  return {
    currentStep,
    totalSteps,
    isComplete: currentStep >= totalSteps,
  };
}
