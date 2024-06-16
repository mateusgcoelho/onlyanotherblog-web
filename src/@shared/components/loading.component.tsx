export function LoadingComponent() {
  return (
    <div className="flex w-full h-full flex-col p-4 items-center justify-center">
      <div className="flex w-full items-center justify-center gap-x-6">
        <div className="animate-spin h-4 w-4 bg-purple-500"></div>
        <div className="animate-spin h-4 w-4 bg-purple-500"></div>
        <div className="animate-spin h-4 w-4 bg-purple-500"></div>
      </div>
    </div>
  );
}
