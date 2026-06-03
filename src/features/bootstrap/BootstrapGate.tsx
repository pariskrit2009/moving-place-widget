import { useQuery } from "@tanstack/react-query";
import { fetchBootstrap } from "./api";
import { BootstrapLoadingScreen } from "./BootstrapLoadingScreen";
import { BootstrapErrorScreen } from "./BootstrapErrorScreen";

export function BootstrapGate({ children }: { children: React.ReactNode }) {
  const { isPending, isError, error } = useQuery({
    queryKey: ["bootstrap"],
    queryFn: fetchBootstrap,
    staleTime: Infinity,
    retry: false,
  });

  if (isPending) return <BootstrapLoadingScreen />;
  if (isError) return <BootstrapErrorScreen error={error} />;

  return <>{children}</>;
}
