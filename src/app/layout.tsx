import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google'; // Import des polices Google
import './globals.css';

export const metadata: Metadata = {
  title: 'Générateur de Flyers',
  description: 'Créez facilement vos flyers personnalisés',
  icons: {
    icon: '/favicon.ico',
  },
};

// Ajout des polices
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-roboto-mono' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
