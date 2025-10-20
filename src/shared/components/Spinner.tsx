import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="animate-spin text-muted-foreground w-6 h-6" />
  </div>
);
