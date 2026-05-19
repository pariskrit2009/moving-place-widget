import { useState } from "react";
import {
  useNavigateWithParams,
  usePopoverResize,
  useWidgetParams,
} from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/form/FormSection";
import { StarRating } from "@/components/ui/star-rating";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Modal } from "@/components/modals";
import {
  Info,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  X,
  Package,
} from "lucide-react";

const priceBreakdown = [
  {
    id: "loading",
    label: "Loading service (no transport)",
    price: "$415.00",
    icon: Package,
  },
  {
    id: "unloading",
    label: "Unloading service (no transport)",
    price: "$415.00",
    icon: Package,
  },
  {
    id: "protection",
    label: "Move Protection fee",
    price: "Included",
    isTeal: true,
    icon: ShieldCheck,
  },
];

export default function QuotePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hostOrigin } = useWidgetParams();
  const contentHeight = document
    .querySelector<HTMLElement>("#widget-content")
    ?.getBoundingClientRect().height;

  usePopoverResize({
    isPopoverOpen,
    hostOrigin,
    defaultIframeHeight: contentHeight,
  });

  const handleContinue = () => {
    navigateWithParams("/customize");
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <WidgetLayout
      onContinue={handleContinue}
      navigateBack={() => navigateWithParams("/movers")}
    >
      <FormSection
        title="Mover Quotes"
        description="Compare quotes from top-rated moving companies"
      >
        <p>QUOTE PAGE</p>
        <Button onClick={() => navigateWithParams("/movers")}>
          See more movers
        </Button>

        <StarRating rating={5} />
        <div className="">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1">
                <span className="text-[#3290a2]">
                  Price Details ( Popover )
                </span>
                <Info className="size-4 text-[#3290a2]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[calc(100vw-2rem)] max-w-[576px] rounded-3xl border-[#eceef2] bg-[#f8f8f8] p-0 shadow-[0px_4px_6px_-1px_rgba(18,18,23,0.08),0px_2px_4px_-1px_rgba(18,18,23,0.06)]"
              align="start"
              id="popover-content"
            >
              <button
                onClick={() => setIsPopoverOpen(false)}
                className="absolute right-[15px] top-[15px] z-10"
              >
                <X className="size-5 text-[#2e343e]" />
              </button>

              <div className="flex flex-col gap-8 px-6 pt-9 pb-6">
                <h2 className="text-2xl font-bold text-[#2e343e]">
                  Price details
                </h2>

                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col gap-2 ">
                    {priceBreakdown.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <button
                          onClick={() => toggleRow(item.id)}
                          className="flex w-full items-center gap-2 border-b border-[#d5dae2] py-1 pb-2 text-left"
                        >
                          <item.icon className="size-[15px] shrink-0 text-[#2e343e]" />
                          <span className="flex-1 text-base text-[#2e343e]">
                            {item.label}
                          </span>
                          <span
                            className={`whitespace-nowrap text-base ${
                              item.isTeal
                                ? "font-normal text-[#3290a2]"
                                : "font-bold text-[#2e343e]"
                            }`}
                          >
                            {item.price}
                          </span>
                          <ChevronDown
                            className={`size-[15px] shrink-0 text-[#2e343e] transition-transform duration-200 ${
                              expandedRows[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedRows[item.id] && (
                          <div className="py-2 pl-7 text-sm text-[#677890]">
                            <p>Itemized details coming soon</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base font-bold text-[#2e343e]">
                        Order total
                      </span>
                      <span className="text-base font-bold text-[#2e343e]">
                        $830.00
                      </span>
                    </div>
                    <div className="flex items-start justify-between py-2">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-[#3290a2]">
                          Due now
                        </span>
                        <span className="text-sm leading-[18px] text-[#677890]">
                          No charges until the day before the move
                        </span>
                      </div>
                      <span className="whitespace-nowrap text-base font-bold text-[#3290a2]">
                        $0.00
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base font-bold text-[#2e343e]">
                        Order total
                      </span>
                      <span className="text-base font-bold text-[#2e343e]">
                        $830.00
                      </span>
                    </div>
                    <div className="flex items-start justify-between py-2">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-[#3290a2]">
                          Due now
                        </span>
                        <span className="text-sm leading-[18px] text-[#677890]">
                          No charges until the day before the move
                        </span>
                      </div>
                      <span className="whitespace-nowrap text-base font-bold text-[#3290a2]">
                        $0.00
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base font-bold text-[#2e343e]">
                        Order total
                      </span>
                      <span className="text-base font-bold text-[#2e343e]">
                        $830.00
                      </span>
                    </div>
                    <div className="flex items-start justify-between py-2">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-[#3290a2]">
                          Due now
                        </span>
                        <span className="text-sm leading-[18px] text-[#677890]">
                          No charges until the day before the move
                        </span>
                      </div>
                      <span className="whitespace-nowrap text-base font-bold text-[#3290a2]">
                        $0.00
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base font-bold text-[#2e343e]">
                        Order total
                      </span>
                      <span className="text-base font-bold text-[#2e343e]">
                        $830.00
                      </span>
                    </div>
                    <div className="flex items-start justify-between py-2">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-[#3290a2]">
                          Due now
                        </span>
                        <span className="text-sm leading-[18px] text-[#677890]">
                          No charges until the day before the move
                        </span>
                      </div>
                      <span className="whitespace-nowrap text-base font-bold text-[#3290a2]">
                        $0.00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-2xl bg-[#f1faf9] px-4 py-3">
                  <CheckCircle2 className="size-5 shrink-0 text-[#3290a2]" />
                  <p className="text-sm leading-relaxed text-[#2e343e]">
                    Free cancellation or rescheduling up to 48 hours before your
                    move
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            triggerLabel="Price Details"
          >
            <h2 className="text-2xl font-bold text-[#2e343e]">
              Price details
            </h2>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {priceBreakdown.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <button
                      onClick={() => toggleRow(item.id)}
                      className="flex w-full items-center gap-2 border-b border-[#d5dae2] py-1 pb-2 text-left"
                    >
                      <item.icon className="size-[15px] shrink-0 text-[#2e343e]" />
                      <span className="flex-1 text-base text-[#2e343e]">
                        {item.label}
                      </span>
                      <span
                        className={`whitespace-nowrap text-base ${
                          item.isTeal
                            ? "font-normal text-[#3290a2]"
                            : "font-bold text-[#2e343e]"
                        }`}
                      >
                        {item.price}
                      </span>
                      <ChevronDown
                        className={`size-[15px] shrink-0 text-[#2e343e] transition-transform duration-200 ${
                          expandedRows[item.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedRows[item.id] && (
                      <div className="py-2 pl-7 text-sm text-[#677890]">
                        <p>Itemized details coming soon</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between py-2">
                  <span className="text-base font-bold text-[#2e343e]">
                    Order total
                  </span>
                  <span className="text-base font-bold text-[#2e343e]">
                    $830.00
                  </span>
                </div>
                <div className="flex items-start justify-between py-2">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#3290a2]">
                      Due now
                    </span>
                    <span className="text-sm leading-[18px] text-[#677890]">
                      No charges until the day before the move
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-base font-bold text-[#3290a2]">
                    $0.00
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-2xl bg-[#f1faf9] px-4 py-3">
              <CheckCircle2 className="size-5 shrink-0 text-[#3290a2]" />
              <p className="text-sm leading-relaxed text-[#2e343e]">
                Free cancellation or rescheduling up to 48 hours before your
                move
              </p>
            </div>
          </Modal>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis,
          dolore. Iure, ratione eligendi quia vero eaque ad aperiam explicabo.
          Fuga recusandae ullam quae at ratione nobis doloribus reprehenderit
          dolore ea?
        </p>

        {/* {isLoading ? (
          <div className="text-center py-8">Loading quotes...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">Failed to load quotes</div>
        ) : quotes && quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <Card
                key={quote.id}
                className={`
                  cursor-pointer transition-all hover:shadow-md
                  ${selectedQuote === quote.id ? "ring-2 ring-blue-600" : ""}
                `}
                onClick={() => handleQuoteSelect(quote.id)}
                role="radio"
                aria-checked={selectedQuote === quote.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleQuoteSelect(quote.id);
                  }
                }}
              >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{quote.company}</CardTitle>
                  <span className="text-lg font-semibold text-blue-600">
                    ${quote.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <StarRating rating={quote.rating} />
                  <span className="text-gray-300">|</span>
                  <span className="flex flex-wrap gap-1">
                    {quote.services.slice(0, 2).map((service) => (
                      <span key={service} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                        {service}
                      </span>
                    ))}
                    {quote.services.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{quote.services.length - 2} more
                      </span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">No quotes available</div>
        )} */}
      </FormSection>
    </WidgetLayout>
  );
}
