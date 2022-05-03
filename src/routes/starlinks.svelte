<script lang="ts">
	import ChipGroup from '$lib/components/ChipGroup.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { Avatar } from '$lib/assets';
	import { fromBase64 } from '$lib/utils';
	import moment from 'moment';
	import { writable } from 'svelte/store';

	export let data;
	const dto = fromBase64<StarlinksDTO.DTO>(data);

	let value = '';
	const status = ['all', 'alive', 'decayed'];
	let statusIndex = 0;
	const sorts = ['latest', 'oldest'];
	let sortIndex = 0;

	$: matches = dto.starlinks
		.filter((starlink) => {
			if (value === '') return true;
			return (
				starlink.name.toLowerCase().includes(value.toLowerCase()) ||
				starlink.launchName?.toLowerCase().includes(value.toLowerCase())
			);
		})
		.filter(
			(starlink) =>
				status[statusIndex] === 'all' ||
				(status[statusIndex] === 'alive' && !starlink.decayed) ||
				(status[statusIndex] === 'decayed' && starlink.decayed)
		)
		.sort(
			(a, b) =>
				(a.lastUpdate - b.lastUpdate) * (sorts[sortIndex] === 'oldest' ? 1 : -1)
		);

	const start = writable(0);
	const end = writable(15);

	$: slice = matches.slice($start, $end);

	const lastUpdate = dto.starlinks.reduce(
		(a, b) => Math.max(a, b.lastUpdate),
		0
	);
	const description = `SpaceX Starlink Missions have ${
		dto.starlinks.filter((starlink) => !starlink.decayed).length
	} active and ${
		dto.starlinks.filter((starlink) => starlink.decayed).length
	} decayed.`;
</script>

<svelte:head>
	<title>Starlinks satelites | SpaceX Data</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="Starlinks satelites | SpaceX Data" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={Avatar} />
</svelte:head>

<h1>
	Starlink Satelites - {moment.utc(lastUpdate).local().format('YYYY-MM-DD')}
</h1>
<section id="filter">
	<input type="text" bind:value placeholder="Search" />
	<ChipGroup group={status} bind:index={statusIndex} />
	<ChipGroup group={sorts} bind:index={sortIndex} />
</section>
<section id="content">
	<table>
		<tr>
			<th>Name</th>
			<th>Launch</th>
			<th>Last updated</th>
		</tr>
		<tbody>
			{#each slice as starlink}
				<tr class:decayed={starlink.decayed}>
					<td>
						<a href={`/starlink/${starlink.id}`}>
							{starlink.name}
						</a>
					</td>
					<td>
						{#if starlink.launchId}
							<a href={`/launch/${starlink.launchId}`}>
								{starlink.launchName?.toUpperCase()}
							</a>
						{/if}
					</td>
					<td>
						{moment(starlink.lastUpdate).fromNow()}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
<Pagination length={matches.length} {start} {end} />

<style lang="sass">
	@import './starlinks.sass'
</style>
