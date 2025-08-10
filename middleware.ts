import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useSelector } from 'react-redux';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('pathname', pathname)
  const hasLocale = locales.some((loc) =>
    pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );
  if (hasLocale) return NextResponse.next();

  // 获取用户语言偏好（header 或 cookie）
  const cookie = await cookies();
  const locale = cookie.get('NEXT_LOCALE')?.value || defaultLocale;
  console.log(locale, cookie.getAll())
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/((?!_next|api|.*\\..*).*)',
};
