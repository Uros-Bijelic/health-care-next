import AuthContextProvider from '@/context/auth-context';
import QueryClientProvider from '@/context/tanstack-query-context';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Record Health Care',
  description:
    'Record health care app for evidence about medical examinations, medicines, vacciations',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-100 antialiased`}>
        <Toaster />
        <QueryClientProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
