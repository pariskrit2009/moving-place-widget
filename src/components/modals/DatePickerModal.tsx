import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerModalProps {
  onOpenChange?: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
  trigger?: React.ReactNode;
}

export function DatePickerModal({
  onOpenChange,
  selectedDate,
  onSelect,
  minDate,
  trigger,
}: DatePickerModalProps) {
  const defaultClassNames = getDefaultClassNames();
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onSelect(date);
    setOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            day: `${defaultClassNames.day}`,
            caption_label: `${defaultClassNames.caption_label} font-normal text-gray-800 text-base`,
          }}
          // captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
