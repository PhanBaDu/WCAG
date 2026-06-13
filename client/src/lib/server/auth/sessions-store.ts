import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import type { StoredSession } from './types';
import { createRefreshToken, getRefreshExpiryDate, hashRefreshToken } from './jwt';

const DATA_DIR = path.join(process.cwd(), 'data');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

async function ensureSessionsFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(SESSIONS_FILE, 'utf8');
  } catch {
    await writeFile(SESSIONS_FILE, '[]', 'utf8');
  }
}

async function readSessions(): Promise<StoredSession[]> {
  await ensureSessionsFile();
  const raw = await readFile(SESSIONS_FILE, 'utf8');
  return JSON.parse(raw) as StoredSession[];
}

async function writeSessions(sessions: StoredSession[]) {
  await ensureSessionsFile();
  await writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf8');
}

function pruneExpired(sessions: StoredSession[]) {
  const now = Date.now();
  return sessions.filter((session) => new Date(session.expiresAt).getTime() > now);
}

export async function createSession(userId: string) {
  const sessions = pruneExpired(await readSessions());
  const refreshToken = createRefreshToken();
  const session: StoredSession = {
    id: randomUUID(),
    userId,
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: getRefreshExpiryDate(),
    createdAt: new Date().toISOString(),
  };

  sessions.push(session);
  await writeSessions(sessions);

  return { refreshToken, session };
}

export async function rotateSession(refreshToken: string) {
  const sessions = pruneExpired(await readSessions());
  const tokenHash = hashRefreshToken(refreshToken);
  const existing = sessions.find((session) => session.tokenHash === tokenHash);

  if (!existing) {
    return null;
  }

  const remaining = sessions.filter((session) => session.id !== existing.id);
  const nextRefreshToken = createRefreshToken();
  const nextSession: StoredSession = {
    id: randomUUID(),
    userId: existing.userId,
    tokenHash: hashRefreshToken(nextRefreshToken),
    expiresAt: getRefreshExpiryDate(),
    createdAt: new Date().toISOString(),
  };

  remaining.push(nextSession);
  await writeSessions(remaining);

  return { refreshToken: nextRefreshToken, session: nextSession };
}

export async function deleteSessionByToken(refreshToken: string) {
  const sessions = pruneExpired(await readSessions());
  const tokenHash = hashRefreshToken(refreshToken);
  const next = sessions.filter((session) => session.tokenHash !== tokenHash);
  await writeSessions(next);
}

export async function deleteSessionsForUser(userId: string) {
  const sessions = pruneExpired(await readSessions());
  const next = sessions.filter((session) => session.userId !== userId);
  await writeSessions(next);
}
