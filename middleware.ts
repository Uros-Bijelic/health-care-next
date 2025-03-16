import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { AUTH_CONFIG } from './auth.config';

const { auth } = NextAuth(AUTH_CONFIG);

const AUTH_ROUTES = ['/login', '/register'];

export default auth((req) => {
  const isAuth = !!req.auth;
  const pathName = req.nextUrl.pathname;

  if (!isAuth) {
    if (!AUTH_ROUTES.includes(pathName)) {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
    }
  } else {
    if (AUTH_ROUTES.includes(pathName)) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
