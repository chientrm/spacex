import routes from '$lib/constants/routes';
import { all_launches } from '$lib/helpers/spacexdata';
import { truncate } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import Fuse from 'fuse.js';

export const load: PageServerLoad = async ({ url, params, parent }) => {
	const current = parseInt(params.current),
		pageSize = parseInt(params.pageSize),
		upcoming = params.upcoming,
		sort = params.sort,
		search = url.searchParams.get('search');
	let [launches, { timezone }] = await Promise.all([all_launches(), parent()]);
	if (upcoming === 'upcoming') {
		launches = launches.filter((l) => l.upcoming);
	}
	if (upcoming === 'past') {
		launches = launches.filter((l) => !l.upcoming);
	}
	launches = launches.sort((a, b) => a.date_unix - b.date_unix);
	if (sort === 'latest') launches = launches.reverse();
	if (search) {
		console.log({ search });
		const fuse = new Fuse(launches, { keys: ['name', 'details'] });
		launches = fuse.search(search).map((f) => f.item);
	}
	const total = launches.length;
	launches = launches.slice((current - 1) * pageSize, current * pageSize);
	return {
		launches: launches.map(
			({ id, name, date_utc, links, details, success: sucess }) => ({
				id,
				name,
				date_utc,
				logo: links.patch.small,
				details: truncate(details ?? '', 200),
				sucess
			})
		),
		timezone,
		current,
		pageSize,
		upcoming,
		sort,
		total
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const { current, pageSize, upcoming, sort } = params,
			formData = await request.formData(),
			search = formData.get('search');
		throw redirect(
			303,
			routes.LAUNCHES.CURRENT(parseInt(current))
				.PAGE_SIZE(parseFloat(pageSize))
				// @ts-ignore
				.UPCOMING(upcoming)
				// @ts-ignore
				.SORT(sort, search)
		);
	}
};
