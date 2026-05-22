import { useWidgetParams, useWidgetResize, useWidgetTheme } from "@/hooks";
import StepProgress from "@/components/layout/StepProgress";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface WidgetLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  navigateBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
}

export function WidgetLayout({
  children,
  navigateBack,
  onContinue,
  loading,
  continueLabel = "Continue",
}: WidgetLayoutProps) {
  const { hostOrigin } = useWidgetParams();
  useWidgetResize({ hostOrigin });
  useWidgetTheme();

  return (
    <div id="widget-content" className="w-full bg-gray-100">
      <div className="min-h-[600px] max-h-[890px] overflow-auto relative w-full border border-[#b1bbc8] bg-white p-6 pt-0 flex flex-col">
        <div className="space-y-1"></div>

        <div className="sticky top-0 flex justify-between gap-3 w-full pb-4 pt-6  bg-white z-20">
          {navigateBack && (
            <Button
              variant="outline"
              onClick={navigateBack}
              className=" rounded-full border-transparent text-[#2e343e] "
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <StepProgress />
          {onContinue && (
            <Button variant="cta" onClick={onContinue} disabled={loading}>
              {continueLabel}
            </Button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}

export default WidgetLayout;
