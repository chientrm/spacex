<script lang="ts">
	import { fromBase64, truncate } from '$lib/utils';
	import moment from 'moment';
	import { fade } from 'svelte/transition';
	// @ts-ignore
	import SpaceXAvatar from '$lib/assets/spacex-avatar.png?w=150&webp&flatten';

	import './launches.sass';
	export let data;
	const dto = fromBase64<LaunchesDTO>(data);

	let value = '';
	const filters = ['all', 'upcoming', 'past'];
	let filterIndex = 0;
	const sorts = ['desc', 'asc'];
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
		.sort((a, b) => (a.date - b.date) * (sorts[sortIndex] === 'asc' ? 1 : -1));

	let pageIndex = 0;
	const pageSizes = [10, 20, 50];
	let pageSize = pageSizes[0];
	$: length = launches.length;
	$: start = pageIndex * pageSize;
	$: end = Math.min(start + pageSize, length);
	$: slice = launches.slice(start, end);
	$: lastPage = Math.max(Math.ceil(length / pageSize) - 1, 0);
	$: pageIndex > lastPage && (pageIndex = lastPage);
</script>

<article>
	<h2>Launches</h2>
	<section>
		<input type="text" bind:value placeholder="Search" />
		<ul>
			{#each filters as filter, i}
				<label>
					<input type="radio" bind:group={filterIndex} value={i} />
					{filter}
				</label>
			{/each}
		</ul>
		<ul>
			{#each sorts as sort, i}
				<label>
					<input type="radio" bind:group={sortIndex} value={i} />
					{sort}
				</label>
			{/each}
		</ul>
	</section>
	<div>
		{#each slice as launch (launch.id)}
			<div in:fade>
				<a href={`/launch/${launch.id}`} title={launch.details || launch.name}>
					{#if launch.logo}
						<img src={launch.logo} alt="{launch.name} logo" />
					{:else}
						<img src={SpaceXAvatar} alt="SpaceX logo" />
					{/if}
					<br />
					{truncate(launch.name, 20)}
				</a>
				<div>
					{moment.utc(launch.date).local().format('MMM D YYYY')}
				</div>
			</div>
		{/each}
	</div>
	<div>
		<span>Page size</span>
		<select bind:value={pageSize}>
			{#each pageSizes as _pageSize}
				<option value={_pageSize}> {_pageSize} </option>
			{/each}
		</select>
		{start + 1}-{end} of {length}
		<button on:click={() => (pageIndex = 0)} disabled={pageIndex === 0}>
			<span class="material-icons">first_page</span>
		</button>
		<button on:click={() => pageIndex--} disabled={pageIndex === 0}>
			<span class="material-icons">chevron_left</span>
		</button>
		<button on:click={() => pageIndex++} disabled={pageIndex === lastPage}>
			<span class="material-icons">chevron_right</span>
		</button>
		<button
			on:click={() => (pageIndex = lastPage)}
			disabled={pageIndex === lastPage}
		>
			<span class="material-icons">last_page</span>
		</button>
	</div>
</article>
