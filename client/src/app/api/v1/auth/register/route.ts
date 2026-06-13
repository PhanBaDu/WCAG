import { NextResponse } from 'next/server';
import { issueAuthResponse } from '@/lib/server/auth/issue-auth-response';
import { jsonError, setRefreshCookie } from '@/lib/server/auth/http';
import { isStrongPassword } from '@/lib/server/auth/password';
import { createUser } from '@/lib/server/auth/users-store';
import type { UserRole } from '@/lib/server/auth/types';

export async function POST(request: Request) {
  let body: {
    email?: string;
    password?: string;
    role?: UserRole;
    fullName?: string;
    companyName?: string;
  };

  try {
    body = await request.json();
  } catch {
    return jsonError('Dữ liệu không hợp lệ.', 400);
  }

  const email = body.email?.trim();
  const password = body.password ?? '';
  const role = body.role;

  if (!email || !password || !role) {
    return jsonError('Vui lòng điền đầy đủ thông tin bắt buộc.', 400);
  }

  if (role !== 'NKT' && role !== 'NTD') {
    return jsonError('Vai trò không hợp lệ.', 400);
  }

  if (!isStrongPassword(password)) {
    return jsonError(
      'Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&).',
      400
    );
  }

  if (role === 'NKT' && !body.fullName?.trim()) {
    return jsonError('Vui lòng nhập họ và tên.', 400);
  }

  if (role === 'NTD' && !body.companyName?.trim()) {
    return jsonError('Vui lòng nhập tên công ty.', 400);
  }

  const result = await createUser({
    email,
    password,
    role,
    fullName: body.fullName,
    companyName: body.companyName,
  });

  if ('error' in result) {
    return jsonError('Email đã được sử dụng.', 409);
  }

  const auth = await issueAuthResponse(result.user);
  const response = NextResponse.json({
    accessToken: auth.accessToken,
    user: auth.user,
  });

  setRefreshCookie(response, auth.refreshToken);
  return response;
}
