export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}