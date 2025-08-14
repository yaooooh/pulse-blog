import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl;
  const hasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value || defaultLocale;
  const newUrl = new URL(`/${cookieLocale}${pathname}`, origin);

  // 将原始查询参数全部复制到新 URL
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(newUrl);
}


export const config = {
  matcher: '/((?!_next|api|.*\\..*).*)',
};
