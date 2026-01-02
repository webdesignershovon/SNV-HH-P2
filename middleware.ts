import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const user = req.cookies.get('user');

  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

if (req.nextUrl.pathname.startsWith('/kpi')) {
  const user = JSON.parse(req.cookies.get('user')?.value || '{}');
  if (user.role !== 2) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
