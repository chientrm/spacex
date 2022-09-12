import {
	one_capsule,
	one_launch,
	one_launchpad,
	one_payload,
	one_rocket
} from '$lib/helpers/spacexdata';
import { for_title } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const for_launch = one_launch(params.id).then(
			({
				name,
				date_utc,
				upcoming,
				links,
				capsules,
				details,
				success,
				launchpad,
				rocket,
				payloads
			}) => ({
				name,
				date_utc,
				upcoming,
				logo: links.patch.small,
				youtube_id: links.youtube_id,
				reddits: links.reddit,
				presskit: links.presskit,
				article: links.article,
				wikipedia: links.wikipedia,
				image: links.patch.small,
				images: links.flickr.original,
				details,
				success,
				launchpad,
				rocket,
				capsules,
				payloads
			})
		),
		for_parent = parent(),
		for_launchpad = for_launch.then(({ launchpad }) =>
			launchpad
				? one_launchpad(launchpad).then(({ full_name }) => ({
						id: launchpad,
						full_name
				  }))
				: undefined
		),
		for_rocket = for_launch.then(({ rocket }) =>
			rocket
				? one_rocket(rocket).then(({ name }) => ({ id: rocket, name }))
				: undefined
		),
		for_capsules = for_launch.then(({ capsules }) =>
			Promise.all(
				capsules.map((id) =>
					one_capsule(id).then(({ serial }) => ({ id, serial }))
				)
			)
		),
		for_payloads = for_launch.then(({ payloads }) =>
			Promise.all(
				payloads.map((id) => one_payload(id).then(({ name }) => ({ id, name })))
			)
		),
		for_reddits = for_launch.then(({ reddits }) =>
			Promise.all([
				for_title(reddits.campaign),
				for_title(reddits.recovery),
				for_title(reddits.media),
				for_title(reddits.launch)
			]).then(([campain, recovery, media, launch]) => ({
				campain,
				recovery,
				media,
				launch
			}))
		),
		for_presskit = for_launch.then(({ presskit }) => for_title(presskit)),
		for_article = for_launch.then(({ article }) => for_title(article)),
		for_wikipedia = for_launch.then(({ wikipedia }) => for_title(wikipedia));
	return await Promise.all([
		for_launch,
		for_parent,
		for_launchpad,
		for_rocket,
		for_capsules,
		for_payloads,
		for_reddits,
		for_presskit,
		for_article,
		for_wikipedia
	]).then(
		([
			{
				name,
				date_utc,
				upcoming,
				logo,
				youtube_id,
				details,
				success,
				image,
				images
			},
			{ timezone },
			launchpad,
			rocket,
			capsules,
			payloads,
			reddits,
			presskit,
			article,
			wikipedia
		]) => ({
			launch: {
				name,
				date_utc,
				upcoming,
				logo,
				youtube_id,
				details,
				success,
				launchpad,
				rocket,
				capsules,
				payloads,
				reddits,
				presskit,
				article,
				wikipedia,
				image,
				images
			},
			timezone
		})
	);
};
