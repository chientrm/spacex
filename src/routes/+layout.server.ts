import parser from 'ua-parser-js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ request }) => {
	const ua = parser(request.headers.get('user-agent') || ''),
		is_mobile = ua.device.type === 'mobile';
	return { is_mobile };
};
