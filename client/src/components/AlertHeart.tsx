import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertHeartProps {
  className?: string;
}

export default function AlertHeart({ className }: AlertHeartProps) {
  return (
    <Heart
      className={cn(
        "animate-pulse text-primary fill-primary", 
        className
      )}
    />
  );
}
