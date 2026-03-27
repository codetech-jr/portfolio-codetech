import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always', // /es y /en siempre en la URL
  pathnames: {
    '/': '/',
    '/work': {
      en: '/work',
      es: '/proyectos'
    },
    '/work/[slug]': {
      en: '/work/[slug]',
      es: '/proyectos/[slug]'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
