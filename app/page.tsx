import "./globals.css";
import dynamic from 'next/dynamic';

const DynamicSearch= dynamic(() => import('./components/SearchBar'), { ssr: false });
export default function Home() {
  return (
    <main className="flex min-h-screen items-center gap-2 dark:bg-gray-800">
      <DynamicSearch />
    </main>
  );
}
