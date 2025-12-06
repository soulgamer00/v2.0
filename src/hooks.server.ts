import type { Handle } from '@sveltejs/kit';
import { getSessionUser } from '$lib/auth';
import { cleanupExpiredSessions } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Cleanup expired sessions periodically (every 100 requests)
	if (Math.random() < 0.01) {
		await cleanupExpiredSessions().catch(() => {
			// Silently fail cleanup
		});
	}

	// Get session from cookie
	const sessionId = event.cookies.get('session');
	if (sessionId) {
		const user = await getSessionUser(sessionId);
		if (user) {
			event.locals.user = user;
		} else {
			// Invalid session, clear cookie
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};

