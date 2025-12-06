import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import type { User, Role } from '@prisma/client';

export interface SessionUser {
	id: string;
	username: string;
	fullName: string;
	role: Role;
	hospitalId: number | null;
}

export async function hashPassword(password: string): Promise<string> {
	const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
	return bcrypt.hash(password, rounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<string> {
	const sessionId = crypto.randomUUID();
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

	await prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt
		}
	});

	return sessionId;
}

export async function getSessionUser(sessionId: string): Promise<SessionUser | null> {
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true }
	});

	if (!session || session.expiresAt < new Date()) {
		return null;
	}

	if (!session.user.isActive) {
		return null;
	}

	return {
		id: session.user.id,
		username: session.user.username,
		fullName: session.user.fullName,
		role: session.user.role,
		hospitalId: session.user.hospitalId
	};
}

export async function deleteSession(sessionId: string): Promise<void> {
	await prisma.session.delete({
		where: { id: sessionId }
	});
}

export async function cleanupExpiredSessions(): Promise<void> {
	await prisma.session.deleteMany({
		where: {
			expiresAt: {
				lt: new Date()
			}
		}
	});
}

