import { useState } from "react";
import { Modal } from "@/components/modals";
import { StarRating } from "@/components/ui/star-rating";
import { Icon } from "@/components/ui/icon";
import { Briefcase, Package } from "lucide-react";
import type { Provider } from "../types";

// Static data — will be replaced with API data later
const STATIC_WORKING_HOURS = [
  { day: "Sunday", hours: "07:00AM-11:00PM" },
  { day: "Monday", hours: "05:00AM-11:00PM" },
  { day: "Tuesday", hours: "05:00AM-11:00PM" },
  { day: "Wednesday", hours: "05:00AM-11:00PM" },
  { day: "Thursday", hours: "05:00AM-11:00PM" },
  { day: "Friday", hours: "05:00AM-12:00AM" },
  { day: "Saturday", hours: "07:00AM-12:00AM" },
];

const STATIC_EQUIPMENT = [
  {
    icon: "trolley" as const,
    name: "Furniture dolly or straps",
    description: "always included, no fee",
  },
  {
    icon: "trolley" as const,
    name: "Furniture dolly, hand truck or straps",
    description: "always included, no fee",
  },
  {
    icon: "support" as const,
    name: "Hand tools for assembly",
    description: "always included, no fee",
  },
  {
    icon: "dolly" as const,
    name: "Rope/Tie Downs",
    description: "always included, no fee",
  },
  {
    icon: "dolly" as const,
    name: "Hand truck",
    description: "always included, no fee",
  },
  {
    icon: "sofa" as const,
    name: "Plastic wrap",
    description: "Per Roll, ($45.00/ea.)",
  },
];

const STATIC_ABOUT =
  'On time, efficient, careful & courteous. Never a "stairs fee" or any hidden fees. We strive to provide 5 star service on every move. We are careful who we send into your home, around your family and to handle your property, we offer background checked helpers, checked through Hireahelper. INSURANCE through Hireahelper covers goods while being handled by our helpers up to $.60 per pound (policy must be activated by completing an inventory form). Full coverage insurance also available through Hireahelper. We\'ll never leave you stranded! If late we\'ll send extra helpers to make up time at no cost when possible. Thanks for considering us, we appreciate it.';

const STATIC_REVIEW_STATS: { stars: number; count: number; percent: number }[] = [
  { stars: 5, count: 466, percent: 80 },
  { stars: 4, count: 57, percent: 10 },
  { stars: 3, count: 29, percent: 5 },
  { stars: 2, count: 15, percent: 3 },
  { stars: 1, count: 14, percent: 2 },
];

const STATIC_REVIEWS = [
  {
    name: "Dennis E",
    location: "Ottawa, Illinois",
    rating: 5,
    text: "I hired 3 guys to help me move a piano up stairs... I felt bad for them and did the majority of the heavy lifting myself. It was not the experience I thought I was paying for.",
  },
  {
    name: "Jay S",
    location: "Chicago, Illinois",
    rating: 5,
    text: "This was the best service you could ask for. Great job all around. Will definitely recommend these guys to all I know for their moving needs.",
  },
  {
    name: "Debbie P",
    location: "Peoria, Illinois",
    rating: 5,
    text: "Chris and his team did great job!",
  },
];

const STATIC_CREDENTIALS = [
  {
    title: "MC/State License",
    fields: [
      { label: "MC #:", value: "01813713" },
      { label: "DOT #:", value: "4562627" },
      { label: "State Lic/Cert Name:", value: "ISMOVING LLC" },
      { label: "State Lic/Cert Number:", value: "B202504105617576" },
      { label: "Interstate/Intrastate Authority:", value: "3" },
    ],
  },
  {
    title: "Workers Compensation",
    fields: [
      { label: "Policy Number:", value: "Available Upon Request" },
      { label: "Policy Issuer:", value: "AmTrust" },
    ],
  },
  {
    title: "Uniformed Crews",
    fields: [
      { label: "Policy Number:", value: "Available Upon Request" },
      { label: "Policy Issuer:", value: "AmTrust" },
    ],
  },
];

const TABS = ["Info", "Credentials", "Reviews", "Photos"] as const;
type Tab = (typeof TABS)[number];

interface ProviderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: Provider;
}

export function ProviderDetailModal({
  open,
  onOpenChange,
  provider,
}: ProviderDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Info");

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="[&>button]:sr-only">
      {/* Provider name */}
      <h2 className="text-base font-bold text-[#2e343e]">{provider.name}</h2>

      {/* Rating + stats */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <StarRating
            rating={provider.rating}
            maxStars={5}
            size="sm"
            showValue={false}
          />
          <span className="text-sm text-[#2e343e]">
            {provider.rating} avg
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-[#2e343e]" />
            <span className="text-sm text-[#2e343e]">
              {provider.yearsInBusiness} years in business
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="size-4 text-[#2e343e]" />
            <span className="text-sm text-[#2e343e]">
              {provider.moves} moves
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#d5dae2]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 pb-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-[#3799a3] font-medium text-[#2e343e]"
                : "text-[#2e343e]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Info" && (
        <>
          {/* About section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#2e343e]">
              About {provider.name}
            </h3>
            <p className="text-xs leading-relaxed text-[#2e343e]">
              {STATIC_ABOUT}
            </p>
          </div>

          {/* Working hours */}
          <div className="rounded-lg border border-[#d5dae2] bg-white p-4">
            <p className="mb-3 text-sm font-bold text-[#2e343e]">Working hours</p>
            <div className="flex flex-col gap-2 text-xs text-[#677890]">
              {STATIC_WORKING_HOURS.map(({ day, hours }) => (
                <div key={day} className="flex items-center justify-end">
                  <span className="w-[118px] shrink-0">{day}:</span>
                  <span className="flex-1 text-right">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment details */}
          <div className="rounded-lg border border-[#d5dae2] bg-white p-4">
            <p className="mb-3 text-sm font-bold text-[#2e343e]">
              Equipment Details
            </p>
            <div className="flex flex-col gap-2">
              {STATIC_EQUIPMENT.reduce<React.ReactNode[][]>(
                (rows, item, i) => {
                  if (i % 2 === 0) rows.push([]);
                  rows[rows.length - 1].push(
                    <div key={item.name} className="flex flex-1 items-center gap-2">
                      <Icon
                        name={item.icon}
                        size={18}
                        className="shrink-0 text-[#2e343e]"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-[#2e343e]">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#677890]">
                          {item.description}
                        </span>
                      </div>
                    </div>,
                  );
                  return rows;
                },
                [],
              ).map((row, i) => (
                <div key={i} className="flex gap-2">
                  {row}
                </div>
              ))}
            </div>
          </div>

          {/* Map section — placeholder */}
          <div className="h-[220px] rounded-lg border border-[#d5dae2] bg-[#f0f0f0]" />
        </>
      )}

      {activeTab === "Credentials" && (
        <>
          {/* Credentials header */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#2e343e]">
              Licenses &amp; Other Business Information:
            </h3>
            <p className="text-xs leading-[1.5] text-[#2e343e]">
              MovingPlace requires that moving labor providers operate within
              the law. Sometimes service providers make an extra effort to
              provide features like background-checks, uniformed crew members, or
              commercial liability insurance.
            </p>
          </div>

          {/* Credential cards */}
          <div className="flex flex-col gap-2">
            {STATIC_CREDENTIALS.map((section) => (
              <div
                key={section.title}
                className="rounded-lg border border-[#d5dae2] bg-white p-4"
              >
                <p className="mb-3 text-sm font-bold text-[#2e343e]">
                  {section.title}
                </p>
                <div className="flex flex-col gap-2 text-xs text-[#677890]">
                  {section.fields.map((field) => (
                    <div key={field.label} className="flex items-center gap-2">
                      <span className="w-[213px] shrink-0">
                        {field.label}
                      </span>
                      <span className="flex-1 text-right">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "Reviews" && (
        <>
          {/* Rating summary */}
          <div className="flex items-center gap-4 rounded-lg border border-[#d5dae2] bg-white p-4">
            {/* Star distribution bars */}
            <div className="flex flex-1 flex-col gap-1">
              {STATIC_REVIEW_STATS.map(({ stars, count, percent }) => (
                <div key={stars} className="flex items-center gap-2 text-xs text-[#677890]">
                  <span className="w-3 text-center">{stars}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eceef2]">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-6 text-right">{count}</span>
                </div>
              ))}
            </div>

            {/* Overall rating */}
            <div className="flex flex-col items-center gap-1 border-l border-[#d5dae2] pl-4">
              <span className="text-2xl font-bold text-[#2e343e]">4</span>
              <StarRating rating={provider.rating} maxStars={5} size="sm" showValue={false} />
              <span className="text-xs text-[#677890]">581 reviews</span>
            </div>
          </div>

          {/* Individual reviews */}
          <div className="flex flex-col divide-y divide-[#eceef2]">
            {STATIC_REVIEWS.map((review) => (
              <div key={review.name} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#2e343e]">
                    {review.name}
                    <span className="font-normal text-[#677890]">
                      {" "}from {review.location}
                    </span>
                  </span>
                </div>
                <StarRating rating={review.rating} maxStars={5} size="sm" showValue={false} />
                <p className="text-xs leading-[1.5] text-[#677890]">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}
