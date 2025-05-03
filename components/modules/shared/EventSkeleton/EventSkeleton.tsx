export default function EventSkeleton() {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-16 bg-gray-300 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
