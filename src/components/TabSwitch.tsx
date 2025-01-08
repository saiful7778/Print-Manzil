import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

const TabSwitch: React.FC<{
  select: "table" | "imageEditor";
  onSelect: React.Dispatch<React.SetStateAction<"table" | "imageEditor">>;
}> = ({ select, onSelect }) => {
  return (
    <div className="flex gap-2 items-center p-2 border border-gray-700 rounded-md">
      <TabItem
        className={select === "table" ? "bg-gray-700" : ""}
        onClick={() => onSelect("table")}
      >
        Table
      </TabItem>
      <TabItem
        className={select === "imageEditor" ? "bg-gray-700" : ""}
        onClick={() => onSelect("imageEditor")}
      >
        Image editor
      </TabItem>
    </div>
  );
};

const TabItem = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "w-full text-center p-2 transition-colors duration-300 rounded-md hover:bg-gray-700",
        className
      )}
      type="button"
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

export default TabSwitch;
