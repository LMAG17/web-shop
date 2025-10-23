import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <Card className="p-6 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
        <CardContent className="text-center text-gray-600 text-sm">
          {message || "Loading..."}
        </CardContent>
      </Card>
    </div>
  );
};
