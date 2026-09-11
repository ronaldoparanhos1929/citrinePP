import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Paranhos Personalizados',
  description: 'Vitrine virtual da Paranhos Personalizados - Produtos de sublimação, kits e muito mais.',
  openGraph: {
    title: 'Paranhos Personalizados',
    description: 'Vitrine virtual da Paranhos Personalizados - Produtos de sublimação, kits e muito mais.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 flex flex-col font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 text-center mt-12">
          <p>&copy; {new Date().getFullYear()} Paranhos Personalizados. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
