import "./globals.css";
import dynamic from 'next/dynamic';

const DynamicMovie = dynamic(() => import('./components/Movie'), { ssr: false });
const DynamicSearch = dynamic(() => import('./components/SearchBar'), { ssr: false });

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-20 sm:pt-24"> {/* Thêm padding-top */}
      <main className="flex flex-col min-h-screen items-center gap-8 dark:bg-gray-800">
        <div className="w-full max-w-xl">
          <DynamicSearch />
        </div>
        <div className="w-full">
          <DynamicMovie />
        </div>
      </main>
    </div>
  );
}