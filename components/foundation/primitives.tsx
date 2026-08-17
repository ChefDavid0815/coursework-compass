import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("page-container", className)} {...props} />;
}

export function ContentSection({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx("content-section", className)} {...props} />;
}

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("surface", className)} {...props} />;
}

export function StatusDot({ className }: { className?: string }) {
  return <span className={clsx("status-dot", className)} aria-hidden="true" />;
}

export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <span style={{ transform: `scaleX(${value / 100})` }} />
    </div>
  );
}

export function MotionReveal({ className, delay = 0, ...props }: HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  return <div className={clsx("motion-reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties} {...props} />;
}
