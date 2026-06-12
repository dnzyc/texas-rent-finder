export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-6 text-6xl">🏗️</div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
          Sitemiz Çok Yakında!
        </h1>
        <p className="mb-2 text-lg text-gray-600">
          Şu anda Texas Rent Finder üzerinde çalışıyoruz.
        </p>
        <p className="text-gray-500">
          Yeni sürümümüzü kısa süre içinde sizlerle paylaşacağız. Bizi takipte kalın!
        </p>
        <div className="mt-10 h-1 w-16 rounded-full bg-orange-500 mx-auto" />
        <p className="mt-6 text-sm text-gray-400">
          Texas Rent Finder &mdash; Apt. 101
        </p>
      </div>
    </main>
  );
}
