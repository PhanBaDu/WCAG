import { signAccessToken } from './jwt';
import { createSession } from './sessions-store';
import { toPublicUser, updateLastLogin } from './users-store';
import type { AuthResponse, StoredUser } from './types';

export async function issueAuthResponse(user: StoredUser): Promise<AuthResponse & { refreshToken: string }> {
  const updatedUser = (await updateLastLogin(user.id)) ?? user;
  const accessToken = await signAccessToken({ sub: updatedUser.id, role: updatedUser.role });
  const { refreshToken } = await createSession(updatedUser.id);

  return {
    accessToken,
    refreshToken,
    user: toPublicUser(updatedUser),
  };
}
