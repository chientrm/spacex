import numbers from '$lib/constants/numbers';
import {
	list_starlinks,
	list_upcoming_launches
} from '$lib/helpers/spacexdata';
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
		list_starlinks().then((starlinks) =>
			starlinks
				.filter((s) => s.height_km && s.latitude && s.longitude)
				.map(({ spaceTrack, latitude, longitude, height_km }) => ({
					name: spaceTrack.OBJECT_NAME,
					lat: latitude!,
					lng: longitude!,
					alt: height_km! / numbers.EARTH_RADIUS_KM
				}))
		),
		parent()
	]).then(([launches, starlinks, { timezone }]) => ({
		launches,
		starlinks,
		timezone
	}));
