import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('clarivex_session');

  const url = req.nextUrl.clone();

  // Protegge /dashboard se non loggato
  if (url.pathname.startsWith('/dashboard') && !session) {
    url.pathname = '/auth/discord';
    return NextResponse.redirect(url);
  }

  // Altrimenti prosegui normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Applica solo a queste rotte
};