import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
  trigger?: React.ReactNode;
}

export function DatePickerModal({
  open,
  onOpenChange,
  selectedDate,
  onSelect,
  minDate,
  trigger,
}: DatePickerModalProps) {
  const handleDateSelect = (date: Date | undefined) => {
    onSelect(date);

    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverContent className="rounded-3xl" align="end">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={{ before: minDate || new Date() }}
          navLayout="around"
          showOutsideDays
          classNames={{
            chevron: ` fill-gray-800`,
            selected: "bg-teal-600 rounded-[8px] text-white",
            day: `${getDefaultClassNames().day}`,
            caption_label: `${getDefaultClassNames().caption_label} font-normal text-gray-800 text-base`,
          }}
          // captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
