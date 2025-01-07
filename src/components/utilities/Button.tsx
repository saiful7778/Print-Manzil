import cn from "@/lib/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex gap-2 rounded-md border select-none border-gray-600 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:pointer-events-none text-sm hover:bg-gray-600 transition-colors duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
