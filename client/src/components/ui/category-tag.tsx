import { cn } from "@/lib/utils";

interface CategoryTagProps {
  children: React.ReactNode;
  className?: string;
}

export function CategoryTag({ children, className }: CategoryTagProps) {
  return (
    <span 
      className={cn(
        "bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}

export default CategoryTag;
