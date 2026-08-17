import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const button = cva(
  "button",
  {
    variants: {
      intent: {
        primary: "button--primary",
        secondary: "button--secondary",
        quiet: "button--quiet",
      },
      size: {
        medium: "button--medium",
        large: "button--large",
        icon: "button--icon",
      },
    },
    defaultVariants: { intent: "primary", size: "medium" },
  },
);

type SharedProps = VariantProps<typeof button> & { className?: string };

export function ButtonLink({ intent, size, className, ...props }: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={clsx(button({ intent, size }), className)} {...props} />;
}

export function Button({ intent, size, className, ...props }: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(button({ intent, size }), className)} {...props} />;
}
