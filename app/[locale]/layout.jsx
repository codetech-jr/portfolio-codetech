import "../globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import StairTransition from '@/components/StairTransition';
import WhatsAppButton from '@/components/WhatsAppButton';
import CustomCursor from '@/components/CustomCursor';
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
const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Codetech JR | Consultor de Soluciones Digitales'
      : 'Codetech JR | Digital Solutions Consultant',
    description: isEs
      ? 'Diseño y desarrollo experiencias digitales de alto impacto. Especializado en sistemas de conversión web, e-commerce, apps y chatbots impulsados por IA.'
      : 'Design and develop high-impact digital experiences. Specialized in web conversion systems, e-commerce, apps and AI-powered chatbots.',
    keywords: isEs
      ? ['portafolio', 'desarrollador web', 'next.js', 'chatbot', 'react native', 'automatización']
      : ['portfolio', 'web developer', 'next.js', 'chatbot', 'react native', 'automation'],
    authors: [{ name: 'Alejandro Daniel', url: 'https://codetechjr.com' }],
    openGraph: {
      title: isEs ? 'Codetech JR | Consultor Digital' : 'Codetech JR | Digital Consultant',
      description: isEs
        ? 'Soluciones digitales premium: webs, apps, chatbots IA.'
        : 'Premium digital solutions: websites, apps, AI chatbots.',
      url: 'https://codetechjr.com',
      siteName: 'Codetech JR',
      locale: locale === 'es' ? 'es_VE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs ? 'Codetech JR | Consultor Digital' : 'Codetech JR | Digital Consultant',
    },
    alternates: {
      canonical: `https://codetechjr.com/${locale}`,
      languages: {
        'en': 'https://codetechjr.com/en',
        'es': 'https://codetechjr.com/es',
      },
    },
    manifest: '/manifest.json',
    applicationName: 'Codetech JR',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Codetech JR',
    },
    formatDetection: {
      telephone: false,
    },
  };
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