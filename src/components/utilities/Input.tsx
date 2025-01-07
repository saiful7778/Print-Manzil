import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "bg-gray-950 text-sm w-full py-1 px-2 rounded-md border border-gray-700",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Input };
