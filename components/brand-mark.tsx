import { Compass } from "lucide-react";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <Compass strokeWidth={1.8} />
    </span>
  );
}
