import { toBase64 } from '$lib/utils';
import { BASE_URL, EARTH_RADIUS_KM } from '$lib/constants'

/** @type {import('./index').RequestHandler} */
export const get = async () => {
	const results = await Promise.all([
		fetch(`${BASE_URL}/launches/upcoming`),
		fetch(`${BASE_URL}/rockets`),
		fetch(`${BASE_URL}/starlink`),
	]);
	if (!results) return { status: 500 };

	/** @type {[Launch.Root, Rocket.Root, Starlink.Root]} */
	const [launches, rockets, starlinks] = await Promise.all([
		results[0].json(),
		results[1].json(),
		results[2].json(),
	]);

	/** @type {IndexDTO.DTO} */
	const data = {
		upcomingLaunches: launches.map(launch => ({
			id: launch.id,
			name: launch.name,
			date: new Date(launch.date_utc).getTime(),
		})).sort((a, b) => a.date - b.date),
		numberOfRockets: rockets.length,
		numberOfStarlinks: starlinks.length,
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
