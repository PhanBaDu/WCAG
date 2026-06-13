import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import type { PublicUser, StoredUser, UserRole } from './types';
import { DEMO_LOGIN_EMAIL, DEMO_LOGIN_PASSWORD } from '@/lib/auth/demo-credentials';
import { hashPassword } from './password';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

async function ensureUsersFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(USERS_FILE, 'utf8');
  } catch {
    await writeFile(USERS_FILE, '[]', 'utf8');
  }
}

async function ensureDemoUser(users: StoredUser[]) {
  if (users.some((user) => user.email === DEMO_LOGIN_EMAIL)) {
    return users;
  }

  users.push({
    id: randomUUID(),
    email: DEMO_LOGIN_EMAIL,
    passwordHash: await hashPassword(DEMO_LOGIN_PASSWORD),
    role: 'NKT',
    fullName: 'Nguyễn Văn A',
    isVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  await writeUsers(users);
  return users;
}

async function readUsers(): Promise<StoredUser[]> {
  await ensureUsersFile();
  const raw = await readFile(USERS_FILE, 'utf8');
  const users = JSON.parse(raw) as StoredUser[];
  return ensureDemoUser(users);
}

async function writeUsers(users: StoredUser[]) {
  await ensureUsersFile();
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

export function toPublicUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    fullName: user.fullName,
    companyName: user.companyName,
  };
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((user) => user.email === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string) {
  const users = await readUsers();
  return users.find((user) => user.id === id) ?? null;
}

export async function createUser(input: {
  email: string;
  password: string;
  role: UserRole;
  fullName?: string;
  companyName?: string;
}) {
  const users = await readUsers();
  const normalizedEmail = input.email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return { error: 'EMAIL_EXISTS' as const };
  }

  const user: StoredUser = {
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash: await hashPassword(input.password),
    role: input.role,
    fullName: input.fullName?.trim() || undefined,
    companyName: input.companyName?.trim() || undefined,
    isVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  return { user };
}

export async function updateLastLogin(userId: string) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    lastLoginAt: new Date().toISOString(),
  };

  await writeUsers(users);
  return users[index];
}
