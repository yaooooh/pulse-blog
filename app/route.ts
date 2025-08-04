// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  console.log(request.url)
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next')) return;
  const locale = request.cookies.get('NEXT_LOCALE')?.value
    || request.headers.get('accept-language')?.split(',')[0].split('-')[0]
    || 'zh';
  const match = ['zh', 'en'].find(l => pathname.startsWith(`/${l}/`));
  if (!match) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}
