import { ErrorScreen } from "@/shared/components/ErrorScreen";
import { LoadingScreen } from "@/shared/components/LoadingScreen";
import { ReactNode } from "react";

interface DataWrapperProps {
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  children: ReactNode;
}

export const DataWrapper = ({
  isLoading,
  error,
  onRetry,
  children,
}: DataWrapperProps) => {
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={onRetry} />;
  return <>{children}</>;
};
