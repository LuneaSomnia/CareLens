import { Snowfall } from '@/components/animations/Snowfall';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#E3F4F9] to-[#C9E9F4] min-h-screen">
        <Snowfall />
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
