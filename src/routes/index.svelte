<script lang="ts">
	// @ts-ignore
	import Earth from '$lib/assets/earth-blue-marble.jpeg?w=800&webp&flatten';
	import { fromBase64 } from '$lib/utils';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import './index.sass';
	export let data;
	const index = fromBase64<IndexDTO>(data);

	let globeEl: HTMLDivElement;

	onMount(() => {
		// @ts-ignore
		const world = Globe()(globeEl);
		world.globeImageUrl(Earth);
		world.width(400);
		world.height(400);
		world.backgroundColor('#fff');
		world.showAtmosphere(false);
		// @ts-ignore
		world.controls().enableZoom = false;
		world.objectsData(index.starlinks);

		return () => world._destructor();
	});
</script>

<svelte:head>
	<title>SpaceX Data</title>
	<meta
		name="description"
		content="SpaceX Data streaming data for serialized dragon capsules, serialized first stage cores, dragon crew members, dragon capsule versions, landing pads and ships, launches, launchpads, launch payloads, Elon's Tesla roadster's current position, rocket versions, ships in the SpaceX fleet, Starlink satellites and orbits"
	/>
</svelte:head>

<article>
	<div>
		<h2>Launches</h2>
		<ul>
			{#each index.upcomingLaunches as launch (launch.id)}
				<li>
					<a href={`/launch/${launch.id}`}> {launch.name} </a>
					<div>
						{moment.utc(launch.date).local().format('MMM D YYYY, h:mm:ss A, Z')}
					</div>
				</li>
			{/each}
		</ul>
		<p>
			Number of rockets: {index.numberOfRockets}
		</p>
		<p>
			Number of starlinks: {index.numberOfStarlinks}
		</p>
	</div>
	<div>
		<h2>Starlinks</h2>
		<div bind:this={globeEl} />
	</div>
</article>
