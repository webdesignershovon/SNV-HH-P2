import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const user = req.cookies.get('user');

  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
