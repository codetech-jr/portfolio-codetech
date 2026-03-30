import "../globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import Script from "next/script";
import { Providers } from "./providers";
import { Inter, Fraunces } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400', '500', '600', '700'] });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', weight: ['400', '700'] });

export async function generateMetadata({ params }) {
// ... (metadata lines omit for brevity in replacement, but kept in actual edit)
// ...
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Load translations on the server
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
       <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
       </head>
      <body className="font-primary antialiased leading-loose bg-white text-slate-900 dark:bg-primary dark:text-white scroll-smooth relative grain"> 
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <PageTransition>
              <Header />
              {children}
              <StairTransition /> 
            </PageTransition>
            <Footer />
            <CustomCursor />
            <WhatsAppButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}