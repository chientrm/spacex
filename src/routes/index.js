import { toBase64 } from '$lib/utils';
import { BASE_URL, EARTH_RADIUS_KM } from '$lib/constants'

/** @type {import('./index').RequestHandler} */
export const get = async () => {
	const results = await Promise.all([
		fetch(`${BASE_URL}/launches/upcoming`),
		fetch(`${BASE_URL}/starlink`),
	]);
	if (!results) return { status: 500 };

	/** @type {[Launch.Root, Starlink.Root]} */
	const [launches, starlinks] = await Promise.all([
		results[0].json(),
		results[1].json(),
	]);

	/** @type {IndexDTO.DTO} */
	const data = {
		upcomingLaunches: launches.slice(0, 5).map(launch => ({
			id: launch.id,
			name: launch.name,
			date: new Date(launch.date_utc).getTime(),
		})).sort((a, b) => a.date - b.date),
		starlinks: starlinks
			.filter(starlink => starlink.latitude && starlink.longitude && starlink.height_km)
			.map(starlink => ({
				name: starlink.spaceTrack.OBJECT_NAME,
				lat: starlink.latitude || 0,
				lng: starlink.longitude || 0,
				alt: (starlink.height_km || 0) / EARTH_RADIUS_KM
			}))
	};
	return { body: { data: toBase64(data) } };
};
