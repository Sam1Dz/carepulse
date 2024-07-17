/* APP THEME */
import ThemeProvider from '@/components/theme';

/* GLOBAL STYLE */
import '../styles/global';

/* TYPES */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CarePulse',
  description: 'CarePulse, Sistem manajemen kesehatan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body style={{ minHeight: '100vh' }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
