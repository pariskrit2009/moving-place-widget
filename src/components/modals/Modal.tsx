import { Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  triggerLabel,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1">
          <span className="text-[#3290a2]">{triggerLabel}</span>
          <Info className="size-4 text-[#3290a2]" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[576px] rounded-3xl border-[#eceef2] bg-[#f8f8f8] p-0 shadow-[0px_4px_6px_-1px_rgba(18,18,23,0.08),0px_2px_4px_-1px_rgba(18,18,23,0.06)]",
          className,
        )}
        showCloseButton={false}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-[15px] top-[15px] z-10"
        >
          <X className="size-5 text-[#2e343e]" />
        </button>
        <div className="flex flex-col gap-8 px-6 pt-9 pb-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
