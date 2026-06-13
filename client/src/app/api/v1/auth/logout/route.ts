import { NextResponse } from 'next/server';
import { clearRefreshCookie, getRefreshTokenFromRequest, jsonError } from '@/lib/server/auth/http';
import { deleteSessionByToken } from '@/lib/server/auth/sessions-store';

export async function DELETE(request: Request) {
  const refreshToken = getRefreshTokenFromRequest(request);

  if (refreshToken) {
    await deleteSessionByToken(refreshToken);
  }

  const response = NextResponse.json({ success: true });
  clearRefreshCookie(response);
  return response;
}
