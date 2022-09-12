import { ENVIRONMENT, SENTRY_DSN } from '$env/static/private';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

export const handle: Handle = ({ event, resolve }) => {
	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	console.log({ error });
	if (SENTRY_DSN?.length) {
		const { request } = event,
			sentry = new Toucan({
				dsn: SENTRY_DSN,
				request,
				allowedCookies: /(.*)/,
				allowedHeaders: /(.*)/,
				allowedSearchParams: /(.*)/,
				environment: ENVIRONMENT
			});
		sentry.setExtra('event', event);
		sentry.captureException(error);
	}
};
