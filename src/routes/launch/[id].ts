import { BASE_URL } from '$lib/constants';
import { fetchData, toBase64 } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

import type { DTO } from './dto';

const getTitle = async (url?: string) => {
	if (!url) return;
	const res = await fetch(url);
	const text = await res.text();
	const title = text.match(/<title>(.*?)<\/title>/);
	if (!title) return undefined;
	return title[1];
};

export const get: RequestHandler = async ({ params }) => {
	// @ts-ignore
	const { id } = params;
	const launch = await fetchData<Launch.Root2>(`${BASE_URL}/launches/${id}`);
	const [
		campaignTitle,
		recoveryTitle,
		mediaTitle,
		launchTitle,
		presskitTitle,
		articleTitle,
		wikipediaTitle,
		launchpadName,
		rocketName,
		capsuleSerials,
		payloadNames
	] = await Promise.all([
		getTitle(launch.links.reddit.campaign),
		getTitle(launch.links.reddit.recovery),
		getTitle(launch.links.reddit.media),
		getTitle(launch.links.reddit.launch),
		getTitle(launch.links.presskit),
		getTitle(launch.links.article),
		getTitle(launch.links.wikipedia),
		fetchData<LaunchPad.Root2>(
			`${BASE_URL}/launchpads/${launch.launchpad}`
		).then((res) => res.name),
		fetchData<Rocket.Root2>(`${BASE_URL}/rockets/${launch.rocket}`).then(
			(res) => res.name
		),
		Promise.all(
			launch.capsules.map((id) =>
				fetchData<Capsule.Root2>(`${BASE_URL}/capsules/${id}`).then(
					(capsule) => capsule.serial
				)
			)
		),
		Promise.all(
			launch.payloads.map((id) =>
				fetchData<Payload.Root2>(`${BASE_URL}/payloads/${id}`).then(
					(payload) => payload.name
				)
			)
		)
	]);
	const dto: DTO = {
		name: launch.name,
		date: new Date(launch.date_utc).getTime(),
		campaign: launch.links.reddit.campaign,
		campaignTitle,
		recovery: launch.links.reddit.recovery,
		recoveryTitle,
		media: launch.links.reddit.media,
		mediaTitle,
		launch: launch.links.reddit.launch,
		launchTitle,
		presskit: launch.links.presskit,
		presskitTitle,
		article: launch.links.article,
		articleTitle,
		wikipedia: launch.links.wikipedia,
		wikipediaTitle,
		details: launch.details,
		image: launch.links.patch.small,
		images: launch.links.flickr.original,
		youtubeId: launch.links.youtube_id,
		launchpadId: launch.launchpad,
		launchpadName,
		rocketId: launch.rocket,
		rocketName,
		capsuleIds: launch.capsules,
		capsuleSerials,
		payloadIds: launch.payloads,
		payloadNames,
		success: launch.success,
		upcoming: launch.upcoming
	};
	return { body: { data: toBase64(dto) } };
};
