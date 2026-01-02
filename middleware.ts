import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow login page always
  if (pathname === '/login') {
    return NextResponse.next();
  }

  const userCookie = req.cookies.get('user')?.value;

  // Not logged in
  if (!userCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  let user: any;
  try {
    user = JSON.parse(userCookie);
  } catch {
    // Corrupted cookie → force logout
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Suspended account
  if (user.role === 0) {
    return NextResponse.redirect(new URL('/login?blocked=1', req.url));
  }

  // KPI only for role 2
  if (pathname.startsWith('/kpi') && user.role !== 2) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/kpi/:path*', '/form/:path*']
};
