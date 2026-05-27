import { Modal } from "@/components/modals";
import { CheckCircle2, ChevronDown, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface PriceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function PriceDetailsModal({
  open,
  onOpenChange,
}: PriceDetailsModalProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="[&>button]:sr-only"
    >
      <h2 className="text-2xl font-bold text-[#2e343e]">Price details</h2>

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
            <span className="text-base font-bold text-[#2e343e]">$830.00</span>
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
          Free cancellation or rescheduling up to 48 hours before your move
        </p>
      </div>
    </Modal>
  );
}
