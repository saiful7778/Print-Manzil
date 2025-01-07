import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

const Checkbox = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn("size-4", className)}
      ref={ref}
      {...props}
    />
  );
});

export { Checkbox };
