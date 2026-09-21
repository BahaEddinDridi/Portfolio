"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { SpinnerIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md text-sm font-medium transition-transform duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline:
          "border border-slate-200 bg-transparent text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-50 dark:hover:bg-slate-800",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
        ghost:
          "text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-800",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-lg": "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  /** Render as the single child element instead of a `<button>` — for links. */
  asChild?: boolean;
}

/**
 * The app's button.
 *
 * The click ripple is decorative and lives in component state; its keyframes are
 * declared in `globals.css` rather than injected into `document.head` at
 * runtime, which is what the previous version did on every mount.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, loading, onClick, asChild, ...props },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple: Ripple = {
        id: Date.now(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      };

      setRipples((current) => [...current, ripple]);
      window.setTimeout(
        () => setRipples((current) => current.filter((r) => r.id !== ripple.id)),
        700
      );

      onClick?.(event);
    };

    const classes = cn(buttonVariants({ variant, size }), className);

    // A slotted child owns its own rendering, so the ripple layer is skipped.
    if (asChild) {
      return (
        <Slot className={classes} ref={ref} onClick={onClick} {...props}>
          {children}
        </Slot>
      );
    }

    const rippleColor =
      variant === "destructive" || variant == null || variant === "default"
        ? "bg-white/30 dark:bg-slate-900/20"
        : "bg-slate-900/10 dark:bg-white/10";

    return (
      <button
        className={classes}
        onClick={handleClick}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading && <SpinnerIcon className="h-4 w-4 animate-spin" />}
          {children}
        </span>

        <span aria-hidden className="absolute inset-0 z-0">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className={cn("animate-ripple absolute rounded-full", rippleColor)}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;
