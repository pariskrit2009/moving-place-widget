import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md";
  showValue?: boolean;
}

type StarState = "full" | "half" | "empty";

function getStarStates(rating: number, maxStars: number): StarState[] {
  const states: StarState[] = [];
  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      states.push("full");
    } else if (rating >= i - 0.5) {
      states.push("half");
    } else {
      states.push("empty");
    }
  }
  return states;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = true,
}: StarRatingProps) {
  const clamped = Math.min(
    Math.max(Number.isNaN(rating) ? 0 : rating, 0),
    maxStars,
  );
  const states = getStarStates(clamped, maxStars);
  const starSize = size === "sm" ? "size-3" : "size-4";

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rating: ${clamped.toFixed(1)} out of ${maxStars} stars`}
    >
      {states.map((state, i) => {
        if (state === "full") {
          return (
            <Star
              key={i}
              className={`${starSize} text-yellow-400`}
              fill="currentColor"
              stroke="currentColor"
              aria-hidden="true"
            />
          );
        }

        if (state === "half") {
          return (
            <span key={i} className="relative inline-flex" aria-hidden="true">
              <Star className={`${starSize} text-muted-foreground/30`} />
              <Star
                className={`absolute top-0 left-0 ${starSize} text-yellow-400`}
                fill="currentColor"
                stroke="currentColor"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </span>
          );
        }

        return (
          <Star
            key={i}
            className={`${starSize} text-muted-foreground/30`}
            aria-hidden="true"
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium">{clamped.toFixed(1)}</span>
      )}
    </div>
  );
}
