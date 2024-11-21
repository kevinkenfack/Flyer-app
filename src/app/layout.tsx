import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-primary-dark py-4 px-6 text-white">
          <h1 className="text-2xl font-bold">Créez votre Flyer Personnalisé</h1>
        </header>
        <main className="container mx-auto my-8 px-4">{children}</main>
        <footer className="bg-primary-dark py-4 px-6 text-white text-center">
          <p>&copy; 2023 Flyer App. Tous droits réservés.</p>
        </footer>
      </body>
    </html>
  );
}