// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SessionUser } from '$lib/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: SessionUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
