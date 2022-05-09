import type { RequestHandler } from '.svelte-kit/types/src/routes';

export const get: RequestHandler = async () => {
	return { body: 'google-site-verification: google4a2b4fbf5f6ce867.html' };
};
