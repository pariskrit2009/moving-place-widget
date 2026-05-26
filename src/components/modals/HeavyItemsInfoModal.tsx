import { Modal } from "@/components/modals";

interface HeavyItemsInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeavyItemsInfoModal({
  open,
  onOpenChange,
}: HeavyItemsInfoModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="[&>button]:sr-only"
    >
      <p className="text-2xl font-bold text-[#2e343e] text-center">
        Extra heavy items
      </p>

      <div className="text-sm text-[#2e343e] space-y-3 leading-relaxed">
        <p>
          Extra heavy items are typically 300 lbs or more. Some movers may
          charge additional fees for items between 450–600+ lbs or for pianos.
        </p>

        <p>
          Any applicable fees are automatically added to your quote once you
          indicate these items.
        </p>

        <p className="font-bold">Why this matters</p>
        <p>
          Items over 300 lbs often require a 3–4 person crew, especially if
          stairs are involved. We&apos;ll show you only movers equipped to
          handle these items when you add them.
        </p>

        <p className="font-bold">Examples</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            300–450 lbs: Large refrigerators, solid wood furniture, gym
            equipment.
          </li>
          <li>
            450–600+ lbs: Gun safes, hot tubs, pool tables (disassembled, NOT
            slate).
          </li>
        </ul>
        <p>
          (Don&apos;t worry — your average couch, dresser, or fridge usually
          weighs less than 300 lbs.)
        </p>

        <p className="font-bold">Pianos</p>
        <p>If you need to move a piano:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make sure the mover lists piano moving as a service.</li>
          <li>Choose between upright or baby grand/grand pianos.</li>
          <li>
            Upright movers may not handle baby grands — select the correct type
            to find specialists.
          </li>
        </ul>
      </div>
    </Modal>
  );
}
