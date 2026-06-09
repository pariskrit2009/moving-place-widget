import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

function getErrorMessage(error: Error): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      return "Invalid or expired widget credentials. Please contact support.";
    }

    if (!error.response) {
      return "Unable to connect. Please check your connection and try again.";
    }
  }

  return "Something went wrong. Please try again later.";
}

export function BootstrapErrorScreen({ error }: { error: Error }) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["bootstrap"] });
  };

  return (
    <div className="flex min-h-[640px] items-center justify-center">
      <div className="max-w-sm text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
        <button
          onClick={handleRetry}
          className="text-white rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
