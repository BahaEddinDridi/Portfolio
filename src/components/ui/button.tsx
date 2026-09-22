"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { SpinnerIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-display rounded-sm relative inline-flex cursor-pointer items-center justify-center overflow-hidden text-xs font-bold tracking-[0.15em] uppercase transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Struck gold. The one call to action per screen. */
        gilded:
          "bg-[linear-gradient(180deg,#e3a857_0%,#c48b3c_100%)] text-[#2a1b08] shadow-[0_6px_18px_var(--glow)] hover:brightness-105",
        /** Engraved outline. The quiet companion to a gilded button. */
        etched:
          "border-gilt/50 text-gilt-text border bg-transparent hover:bg-gilt/10",
        /** Witchfire. For anything that reads as a spell rather than a link. */
        arcane:
          "border-arcane/45 bg-arcane/15 text-arcane border hover:bg-arcane/25",
        destructive:
          "bg-destructive text-background hover:brightness-110",
        ghost: "text-foreground hover:bg-gilt/10",
        link: "text-gilt-text underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-lg": "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "gilded", size: "default" },
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

    // A dark ripple reads on gold; a light one reads on everything else.
    const rippleColor =
      variant == null || variant === "gilded" || variant === "destructive"
        ? "bg-black/20"
        : "bg-gilt/25";

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
