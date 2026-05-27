import { Icon } from "@/components/ui/icon";

export function CrewSizeColumn({
  movers,
  hours,
  hasTruck = false,
}: {
  movers: number;
  hours: number;
  hasTruck?: boolean;
}) {
  return (
    <div className="flex flex-col px-6 items-center gap-[6px] rounded-xl bg-gray-50 py-[10px]">
      <span className="text-[10px] text-gray-500">Crew size</span>
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-0">
          <Icon name="movers-icon" size={24} className="text-gray-800" />
          <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {movers} movers
          </span>
        </div>
        <div className="flex flex-col items-center gap-0">
          <Icon name="clock" size={24} className="text-gray-800" />
          <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {hours} hours
          </span>
        </div>
        {hasTruck && (
          <div className="flex flex-col items-center gap-0">
            <Icon name="truck" size={24} className="text-gray-800" />
            <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
              1 truck
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-0.5 leading-[16px] justify-center">
        <span className="text-[10px] font-normal text-teal-600 whitespace-nowrap">
          Equipment included
        </span>
        <Icon name="circle-info" size={10} className="text-teal-600" />
      </div>
    </div>
  );
}
