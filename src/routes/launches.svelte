<script lang="ts">
	// @ts-ignore
	import SpaceXAvatar from '$lib/assets/spacex-avatar.png?w=150&webp&flatten';
	import ChipGroup from '$lib/components/ChipGroup.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import ImageOverlay from '$lib/components/ImageOverlay.svelte';
	import { fromBase64 } from '$lib/utils';
	import { fade } from 'svelte/transition';

	export let data;
	const dto = fromBase64<LaunchesDTO.DTO>(data);

	let value = '';
	const filters = ['all', 'upcoming', 'past'];
	let filterIndex = 0;
	const sorts = ['latest', 'oldest'];
	let sortIndex = 0;

	$: launches = dto.launches
		.filter((launch) => {
			if (value === '') return true;
			return (
				launch.name.toLowerCase().includes(value.toLowerCase()) ||
				launch.details?.toLowerCase().includes(value.toLowerCase())
			);
		})
		.filter(
			(launch) =>
				filters[filterIndex] === 'all' ||
				(filters[filterIndex] === 'upcoming' && launch.upcoming) ||
				(filters[filterIndex] === 'past' && !launch.upcoming)
		)
		.sort(
			(a, b) => (a.date - b.date) * (sorts[sortIndex] === 'oldest' ? 1 : -1)
		);

	let pageIndex = 0;
	const pageSizes = [15, 30, 45, 60];
	let pageSize = pageSizes[0];
	$: length = launches.length;
	$: start = pageIndex * pageSize;
	$: end = Math.min(start + pageSize, length);
	$: slice = launches.slice(start, end);
	$: lastPage = Math.max(Math.ceil(length / pageSize) - 1, 0);
	$: pageIndex > lastPage && (pageIndex = lastPage);

	const description = `SpaceX had launched ${dto.launches.length} missions.`;
</script>

<svelte:head>
	<title>SpaceX Launches</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="SpaceX Launches" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={SpaceXAvatar} />
</svelte:head>

<article>
	<h2>LAUNCHES</h2>
	<section id="filter">
		<input type="text" bind:value placeholder="Search" />
		<ChipGroup group={filters} bind:index={filterIndex} />
		<ChipGroup group={sorts} bind:index={sortIndex} />
	</section>
	<section id="content">
		{#each slice as launch (launch.id)}
			<div in:fade>
				<ImageOverlay
					id={launch.id}
					title={launch.details
						? `${launch.name} - ${launch.details}`
						: launch.name}
					logo={launch.logo || SpaceXAvatar}
					name={launch.name}
				/>
			</div>
		{/each}
	</section>
	<section id="pagination">
		<span>Page size</span>
		<select bind:value={pageSize}>
			{#each pageSizes as _pageSize}
				<option value={_pageSize}> {_pageSize} </option>
			{/each}
		</select>
		{start + 1}-{end} of {length}
		<IconButton
			icon="first_page"
			on:click={() => (pageIndex = 0)}
			disabled={pageIndex === 0}
		/>
		<IconButton
			icon="chevron_left"
			on:click={() => pageIndex--}
			disabled={pageIndex === 0}
		/>
		<IconButton
			icon="chevron_right"
			on:click={() => pageIndex++}
			disabled={pageIndex === lastPage}
		/>
		<IconButton
			icon="last_page"
			on:click={() => (pageIndex = lastPage)}
			disabled={pageIndex === lastPage}
		/>
	</section>
</article>

<style lang="sass">
	@import './launches.sass'
</style>
