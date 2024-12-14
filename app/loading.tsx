export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-center space-y-4">
        <div className="h-8 w-32 bg-muted rounded mx-auto"></div>
        <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
      </div>
    </div>
  );
}