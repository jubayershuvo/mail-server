export default function ErrorPage({ statusCode }: { statusCode: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-bold mb-6">
        {statusCode === 404 ? "Page not found" : "Error"}
      </h1>
      <p className="text-lg">
        {statusCode === 404
          ? "The page you are looking for does not exist."
          : "An unexpected error occurred."}
      </p>
    </div>
  );
}
