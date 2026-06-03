export function BootstrapLoadingScreen() {
  return (
    <div className="flex min-h-[640px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}
