import { type SVGProps } from "react";

import InfoIcon from "@/assets/info.svg?react";
import TrustPilotIcon from "@/assets/trustpilot.svg?react";
import StarIcon from "@/assets/star.svg?react";
import TagIcon from "@/assets/tag.svg?react";
import ShieldCheckIcon from "@/assets/shield-check.svg?react";
import ExtrasIcon from "@/assets/extras.svg?react";
import TimerIcon from "@/assets/timer.svg?react";
import CircleDollarIcon from "@/assets/circle-dollar.svg?react";
import DollyIcon from "@/assets/person-dolly.svg?react";
import ClockIcon from "@/assets/clock.svg?react";
import CircleInfoIcon from "@/assets/circle-info.svg?react";
import MoversTruckIcon from "@/assets/movers-truck.svg?react";
import MoversOnlyIcon from "@/assets/movers-only.svg?react";
import BackgroundCheckedMoversIcon from "@/assets/backgound-checkers.svg?react";
import MoversIcon from "@/assets/movers.svg?react";
import TruckSlash from "@/assets/truck-slash.svg?react";
import TrolleyIcon from "@/assets/trolley.svg?react";
import SofaIcon from "@/assets/sofa.svg?react";
import TruckIcon from "@/assets/truck.svg?react";
import ThumbsUp from "@/assets/thumbs-up.svg?react";
import BoxCarry from "@/assets/box-carry.svg?react";
import SupportIcon from "@/assets/support.svg?react";

import MovingPlaceLogo from "@/assets/moving-place-logo.svg?react";
import { cn } from "@/lib/utils";

const icons = {
  info: InfoIcon,
  "moving-place-logo": MovingPlaceLogo,
  trustpilot: TrustPilotIcon,
  shieldcheck: ShieldCheckIcon,
  star: StarIcon,
  tag: TagIcon,
  extras: ExtrasIcon,
  timer: TimerIcon,
  "circle-dollar": CircleDollarIcon,
  "person-dolly": DollyIcon,
  clock: ClockIcon,
  "circle-info": CircleInfoIcon,
  "movers-truck": MoversTruckIcon,
  "movers-only": MoversOnlyIcon,
  "background-checkers": BackgroundCheckedMoversIcon,
  "movers-icon": MoversIcon,
  "truck-slash": TruckSlash,
  truck: TruckIcon,
  sofa: SofaIcon,
  trolley: TrolleyIcon,
  dolly: DollyIcon,
  thumbsUp: ThumbsUp,
  boxCarry: BoxCarry,
  support: SupportIcon,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  width?: number | string;
  height?: number | string;
}

export function Icon({
  name,
  width,
  height,
  size = 16,
  className,
  ...props
}: IconProps) {
  const SvgIcon = icons[name];
  return (
    <SvgIcon
      width={width ?? size}
      height={height ?? size}
      className={cn("inline", className)}
      {...props}
    />
  );
}
