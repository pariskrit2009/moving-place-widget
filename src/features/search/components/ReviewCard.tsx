import type { ReviewItem } from "../types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { truncateMidLine } from "@/lib/utils/helper";
import { Button } from "@/components/ui/button";

export function ReviewCard({
  review,
  className,
}: {
  review: ReviewItem;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 220;

  const shouldTruncate = review.description.length > LIMIT;

  const displayText =
    expanded || !shouldTruncate
      ? review.description
      : truncateMidLine(review.description, LIMIT);

  return (
    <div
      className={cn(
        "border border-border p-6 rounded-2xl w-full overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2 justify-between">
        <h3 className="text-base font-bold leading-[150%] whitespace-nowrap">
          {review.name}
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-[1.34px]">
            {Array.from({ length: review.rating }).map((_, index) => (
              <div
                className="bg-[#00B67A] w-fit h-fit flex items-center"
                key={index}
              >
                <Icon name="star" />
              </div>
            ))}
          </div>
          {review.status && (
            <span className="text-green-700 items-center flex gap-1">
              <CheckIcon className="h-[14px] w-[14px]" />
              <span>Verified</span>
            </span>
          )}
        </div>
      </div>

      <div className="pt-3">
        <span className="text-base leading-[150%] inline">
          {displayText}

          {shouldTruncate && (
            <Button
              onClick={() => setExpanded((prev) => !prev)}
              className="inline text-teal-600 cursor-pointer !text-base !p-0 min-h-fit cursor-pointer"
            >
              {expanded ? "Read less" : "Read more"}
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}
