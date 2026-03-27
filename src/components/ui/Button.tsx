import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
  type Ref,
  type ComponentType,
} from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "ghost" | "outline";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color">; // exclude common conflict

export const Button = forwardRef(
  <T extends ElementType = "button">(
    { className, variant = "primary", as, ...props }: PolymorphicProps<T>,
    ref: Ref<Element>,
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-gradient-to-r from-primary to-accent text-surface shadow-glow hover:brightness-110",
      ghost: "text-neutral-100 border border-white/10 bg-white/5 hover:border-white/20",
      outline: "border border-primary/60 text-primary hover:bg-primary/10",
    };

    const Component = (as || "button") as ComponentType<any>;
    const tone = variant ?? "primary";

    return (
      <Component ref={ref as never} className={cn(base, variants[tone], className)} {...(props as any)} />
    );
  },
);

Button.displayName = "Button";
