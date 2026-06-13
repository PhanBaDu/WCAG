import { SignJWT, jwtVerify } from 'jose';
import { createHash, randomUUID } from 'crypto';
import { ACCESS_TOKEN_TTL, getJwtSecret, REFRESH_TOKEN_TTL_MS } from './constants';
import type { UserRole } from './types';

const secret = () => new TextEncoder().encode(getJwtSecret());

export type AccessTokenPayload = {
  sub: string;
  role: UserRole;
};

export async function signAccessToken(payload: AccessTokenPayload) {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(secret());
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    const sub = payload.sub;
    const role = payload.role;

    if (!sub || typeof sub !== 'string' || typeof role !== 'string') {
      return null;
    }

    return { sub, role: role as UserRole };
  } catch {
    return null;
  }
}

export function createRefreshToken() {
  return randomUUID() + randomUUID().replace(/-/g, '');
}

export function hashRefreshToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function getRefreshExpiryDate() {
  return new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();
}
