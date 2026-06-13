import { NextResponse } from 'next/server';
import { issueAuthResponse } from '@/lib/server/auth/issue-auth-response';
import { jsonError, setRefreshCookie } from '@/lib/server/auth/http';
import { verifyPassword } from '@/lib/server/auth/password';
import { findUserByEmail } from '@/lib/server/auth/users-store';

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return jsonError('Dữ liệu không hợp lệ.', 400);
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? '';

  if (!email || !password) {
    return jsonError('Vui lòng nhập email và mật khẩu.', 400);
  }

  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return jsonError('Email hoặc mật khẩu không đúng.', 401);
  }

  if (!user.isActive) {
    return jsonError('Tài khoản đã bị khóa.', 403);
  }

  if (!user.isVerified) {
    return jsonError('Vui lòng xác thực email trước.', 403);
  }

  const auth = await issueAuthResponse(user);
  const response = NextResponse.json({
    accessToken: auth.accessToken,
    user: auth.user,
  });

  setRefreshCookie(response, auth.refreshToken);
  return response;
}
