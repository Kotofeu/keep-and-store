import { type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@shared/i18n';

const handleI18nRouting = createMiddleware(routing);

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`).test(pathname) ||
    new RegExp('/((?!_next|_vercel|.*\\..*).*)').test(pathname);
  if (!shouldHandle) {
    return;
  }

  return handleI18nRouting(request);
};

export default middleware;
