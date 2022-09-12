import parser from 'ua-parser-js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ request }) => {
	const ua = parser(request.headers.get('user-agent') || ''),
		is_mobile = ua.device.type === 'mobile',
		// @ts-ignore
		timezone = (request.cf?.timezone as string) ?? 'UTC';
	return { is_mobile, timezone };
};
