import "../globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { Providers } from "./providers";
import { Inter, Fraunces } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import {
  PageTransition,
  StairTransition,
  CustomCursor,
  WhatsAppButton,
} from '@/components/ui/ClientLayoutComponents';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true, // Parche Maestro anti-CLS: Elimina los saltos por FOUT
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '700'],
  adjustFontFallback: true, // Parche Maestro anti-CLS
});

// === METADATOS DINÁMICOS SEO Y GEO ===
export async function generateMetadata({ params }) {
  // En Next.js 15 params es asíncrono
  const { locale } = await params;
  const isEs = locale === 'es';
  
  return {
    title: isEs
      ? 'Estudio de Desarrollo Web & IA | Aumentamos tus Ventas | CodeTechJr'
      : 'Web Development & AI Studio | We Grow Your Sales | CodeTechJr',
    description: isEs
      ? 'No hacemos "páginas bonitas". Construimos sistemas comerciales: Webs veloces, apps y chatbots IA orientados a conversiones para negocios en LATAM y EEUU. Trato 1 a 1.'
      : 'We don\'t make "pretty pages". We build commercial systems: Fast websites, apps, and AI chatbots focused on conversions for businesses in LATAM and the US. 1-on-1 service.',
    keywords: isEs
      ? ['desarrollo web premium', 'páginas web de conversión', 'chatbots IA para empresas', 'agencia desarrollo nextjs', 'CRO', 'portafolio', 'automatización']
      : ['premium web development', 'conversion websites', 'AI chatbots for business', 'nextjs development agency', 'CRO', 'portfolio', 'automation'],
    authors: [{ name: 'Alejandro Daniel', url: 'https://codetechjr.com' }],
    openGraph: {
      title: isEs
        ? 'Estudio Digital & IA | CodeTechJr — Sistemas que convierten'
        : 'Digital & AI Studio | CodeTechJr — Systems that convert',
      description: isEs
        ? 'Webs, apps y chatbots IA de alto rendimiento para negocios que quieren crecer.'
        : 'High-performance websites, apps and AI chatbots for businesses that want to grow.',
      url: 'https://codetechjr.com',
      siteName: 'CodeTechJr',
      locale: locale === 'es' ? 'es_VE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs
        ? 'Estudio Digital & IA | CodeTechJr — Sistemas que convierten'
        : 'Digital & AI Studio | CodeTechJr — Systems that convert',
    },
    metadataBase: new URL('https://www.codetechjr.com'),
    alternates: {
      canonical: '/' + locale,
      languages: {
        'en': '/en',
        'es': '/es',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  // Desestructuración asíncrona de params requerida en Next 15+
  const { locale } = await params;
  
  // Validar si el locale (idioma) en la URL es uno de los permitidos
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Carga de las traducciones (Diccionarios) en el servidor
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/*
          JSON-LD Schema — Inyección de identidad semántica para Google
          Renderiza directo desde el servidor (No afecta hidratación de React ni tiempos de carga)
        */}
        <SchemaJsonLd locale={locale} pageType="homepage" />
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