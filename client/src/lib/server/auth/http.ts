import { NextResponse } from 'next/server';
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_TTL_MS } from './constants';

export function jsonError(message: string, status: number) {
  return NextResponse.json({ message, statusCode: status }, { status });
}

export function setRefreshCookie(response: NextResponse, refreshToken: string) {
  response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/v1/auth',
    maxAge: Math.floor(REFRESH_TOKEN_TTL_MS / 1000),
  });
}

export function clearRefreshCookie(response: NextResponse) {
  response.cookies.set(REFRESH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/v1/auth',
    maxAge: 0,
  });
}

export function getRefreshTokenFromRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${REFRESH_COOKIE_NAME}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(REFRESH_COOKIE_NAME.length + 1));
}

export function getBearerToken(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7);
}
