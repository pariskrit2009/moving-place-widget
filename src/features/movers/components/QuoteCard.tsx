import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { ProviderBlock } from "./ProviderBlock";
import type { MoverQuote } from "../types";
import { useNavigateWithParams } from "@/hooks";

function Divider() {
  return (
    <div className="py-3">
      <div className="h-px w-full bg-gray-200" />
    </div>
  );
}

export function QuoteCard({ quote }: { quote: MoverQuote }) {
  const { navigateWithParams } = useNavigateWithParams();
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold leading-8.5 text-gray-800">
              ${quote.totalPrice}
            </span>
            <button className="flex items-center gap-0.5">
              <span className="text-sm text-teal-600">Price details</span>
              <Info className="size-3.75 text-teal-600" />
            </button>
          </div>
          <Button
            variant="cta"
            className="px-3 py-3"
            onClick={() => navigateWithParams("/customize")}
          >
            Select & Review
          </Button>
        </div>

        <Divider />

        {quote.services.map((service, index) => (
          <div key={index}>
            <ProviderBlock service={service} />
            {index < quote.services.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
}
