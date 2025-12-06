import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';
import { verifyPassword, createSession } from '$lib/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();
	const username = formData.get('username')?.toString();
	const password = formData.get('password')?.toString();

	if (!username || !password) {
		return json({ error: 'Username and password are required' }, { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: { username }
	});

	if (!user || !user.isActive) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const isValid = await verifyPassword(password, user.passwordHash);
	if (!isValid) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const sessionId = await createSession(user.id);

	cookies.set('session', sessionId, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	return json({ success: true });
};

