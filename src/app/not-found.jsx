export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">Page not found</p>
      <a href="/" className="mt-4 text-[#0088FF] hover:underline">Go Home</a>
    </div>
  );
}