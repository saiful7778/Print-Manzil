import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "bg-gray-950 text-xs md:text-sm w-full p-2 rounded-md border border-gray-700",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Input };
