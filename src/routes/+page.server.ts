import { list_upcoming_launches } from '$lib/helpers/spacexdata';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ parent }) =>
	Promise.all([
		list_upcoming_launches().then((launches) =>
			launches
				.sort((a, b) => a.date_unix - b.date_unix)
				.map(({ id, name, date_utc }) => ({ id, name, date_utc }))
				.slice(0, 6)
				.reverse()
		),
		parent()
	]).then(([launches, { timezone }]) => ({
		launches,
		timezone
	}));
