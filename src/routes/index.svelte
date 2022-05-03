<script lang="ts">
	import Globe from '$lib/components/Globe.svelte';
	import { fromBase64 } from '$lib/utils';
	import moment from 'moment';
	export let data;
	const index = fromBase64<IndexDTO.DTO>(data);
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
		<h2>LAUNCHES</h2>
		<ul>
			{#each index.upcomingLaunches as launch (launch.id)}
				<li>
					<a href={`/launch/${launch.id}`}> {launch.name.toUpperCase()} </a>
					<div>
						{moment
							.utc(launch.date)
							.local()
							.format('MMM D YYYY, h:mm:ss A, Z')
							.toUpperCase()}
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<h2>STARLINKS</h2>
		<Globe starlinks={index.starlinks} />
	</div>
</article>

<style lang="sass">
	@import './index.sass'
</style>
