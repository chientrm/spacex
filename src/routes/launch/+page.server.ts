import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	throw redirect(
		303,
		routes.LAUNCHES.CURRENT(1).PAGE_SIZE(10).UPCOMING('all').SORT('latest')
	);
};
