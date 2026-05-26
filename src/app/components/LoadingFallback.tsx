export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
