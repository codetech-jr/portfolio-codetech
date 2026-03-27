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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

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
            <Script id="crisp-chat" strategy="lazyOnload">
              {`
                window.$crisp=[];
                window.CRISP_WEBSITE_ID="2599c411-9a23-43bb-bfab-51cd2a4190ce";
                (function(){
                  var d=document;
                  var s=d.createElement("script");
                  s.src="https://client.crisp.chat/l.js";
                  s.async=1;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `}
            </Script>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}