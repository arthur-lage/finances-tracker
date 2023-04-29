import { CircleNotch } from "@phosphor-icons/react";

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <CircleNotch className="text-3xl text-white animate-spin" />
    </div>
  );
}
