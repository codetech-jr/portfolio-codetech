import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - /api, /_next, /studio, /robots.txt, /sitemap.js, static files (.ico, .png, etc.)
  matcher: ['/((?!api|_next|studio|robots|sitemap|.*\\..*).*)']
};
