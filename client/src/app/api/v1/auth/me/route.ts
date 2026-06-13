import { NextResponse } from 'next/server';
import { getBearerToken, jsonError } from '@/lib/server/auth/http';
import { verifyAccessToken } from '@/lib/server/auth/jwt';
import { findUserById, toPublicUser } from '@/lib/server/auth/users-store';

export async function GET(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return jsonError('Unauthorized', 401);
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    return jsonError('Unauthorized', 401);
  }

  const user = await findUserById(payload.sub);

  if (!user || !user.isActive) {
    return jsonError('Unauthorized', 401);
  }

  return NextResponse.json(toPublicUser(user));
}
