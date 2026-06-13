import { NextResponse } from 'next/server';
import { getRefreshTokenFromRequest, jsonError, setRefreshCookie } from '@/lib/server/auth/http';
import { signAccessToken } from '@/lib/server/auth/jwt';
import { rotateSession } from '@/lib/server/auth/sessions-store';
import { findUserById } from '@/lib/server/auth/users-store';

export async function POST(request: Request) {
  const refreshToken = getRefreshTokenFromRequest(request);

  if (!refreshToken) {
    return jsonError('Unauthorized', 401);
  }

  const rotated = await rotateSession(refreshToken);

  if (!rotated) {
    return jsonError('Unauthorized', 401);
  }

  const user = await findUserById(rotated.session.userId);

  if (!user || !user.isActive) {
    return jsonError('Unauthorized', 401);
  }

  const accessToken = await signAccessToken({ sub: user.id, role: user.role });
  const response = NextResponse.json({ accessToken });
  setRefreshCookie(response, rotated.refreshToken);
  return response;
}
