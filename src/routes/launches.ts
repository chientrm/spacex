import { toBase64 } from '$lib/utils';
import type { RequestHandler } from '.svelte-kit/types/src/routes';

const extract = (launches: Launch.Root) =>
	launches.map((launch) => ({
		id: launch.id,
		name: launch.name,
		date: new Date(launch.date_utc).getTime(),
		details: launch.details,
		logo: launch.links.patch.small,
		upcoming: launch.upcoming
	}));

export const get: RequestHandler = async () => {
	const res = await fetch('https://api.spacexdata.com/v4/launches');
	if (!res) return { status: 500 };
	const launches = (await res.json()) as Launch.Root;
	const data: LaunchesDTO.DTO = {
		launches: extract(launches)
	};
	return { body: { data: toBase64(data) } };
};
