import { BASE_URL } from '$lib/constants';
import { toBase64 } from '$lib/utils';
import type { RequestHandler } from '.svelte-kit/types/src/routes';

export const get: RequestHandler = async () => {
	const results = await Promise.all([
		fetch(`${BASE_URL}/starlink`),
		fetch(`${BASE_URL}/launches`)
	]);
	if (!results) return { status: 500 };
	const [starlinks, launches]: [Starlink.Root, Launch.Root] = await Promise.all(
		[results[0].json(), results[1].json()]
	);
	const l = new Map(launches.map((l) => [l.id, l.name]));
	const dto: StarlinksDTO.DTO = {
		starlinks: starlinks.map((starlink) => ({
			id: starlink.id,
			name: starlink.spaceTrack.OBJECT_NAME,
			lastUpdate: new Date(starlink.spaceTrack.EPOCH).getTime(),
			launchId: starlink.launch,
			launchName: l.get(starlink.launch || ''),
			decayed: !!starlink.spaceTrack.DECAYED
		}))
	};
	return { body: { data: toBase64(dto) } };
};
