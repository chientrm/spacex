<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	import avatar from '$lib/images/spacex-avatar.png';
	import routes from '$lib/constants/routes';
	import { date_format } from '$lib/utils';
	import Anchor from '$lib/components/Anchor.svelte';
	import { enhance } from '$app/forms';
	import Pages from '$lib/components/Pages.svelte';
	import { page } from '$app/stores';
	export let data: PageServerData;
	$: ({ current, pageSize, upcoming, sort, total } = data);
	const pageSizes = [10, 20, 40];
	$: search = $page.url.searchParams.get('search');
</script>

<h2>{strings.LAUNCHES}</h2>
<section>
	<nav>
		<form use:enhance>
			<input type="text" name="search" value={search} />
			<input type="submit" value={strings.SEARCH} />
		</form>
	</nav>
	<nav>
		<Anchor
			href={routes.LAUNCHES.CURRENT(1)
				.PAGE_SIZE(pageSize)
				.UPCOMING('all')
				// @ts-ignore
				.SORT(data.sort, search)}
			includes={'upcoming/all'}
		>
			{strings.ALL}
		</Anchor>
		<Anchor
			href={routes.LAUNCHES.CURRENT(1)
				.PAGE_SIZE(pageSize)
				.UPCOMING('past')
				// @ts-ignore
				.SORT(data.sort, search)}
			includes={'upcoming/past'}
		>
			{strings.PAST}
		</Anchor>
		<Anchor
			href={routes.LAUNCHES.CURRENT(1)
				.PAGE_SIZE(pageSize)
				.UPCOMING('upcoming')
				// @ts-ignore
				.SORT(data.sort, search)}
			includes={'upcoming/upcoming'}
		>
			{strings.UPCOMING}
		</Anchor>
	</nav>
	<span>|</span>
	<nav>
		<Anchor
			href={routes.LAUNCHES.CURRENT(1)
				.PAGE_SIZE(pageSize)
				// @ts-ignore
				.UPCOMING(data.upcoming)
				.SORT('latest', search)}
			includes={'sort/latest'}
		>
			{strings.LATEST}
		</Anchor>
		<Anchor
			href={routes.LAUNCHES.CURRENT(1)
				.PAGE_SIZE(pageSize)
				// @ts-ignore
				.UPCOMING(data.upcoming)
				.SORT('oldest', search)}
			includes={'sort/oldest'}
		>
			{strings.OLDEST}
		</Anchor>
	</nav>
	<span>|</span>
	<nav>
		<span>{strings.PAGE_SIZE}</span>
		{#each pageSizes as pageSize}
			<Anchor
				href={routes.LAUNCHES.CURRENT(1)
					.PAGE_SIZE(pageSize)
					// @ts-ignore
					.UPCOMING(upcoming)
					// @ts-ignore
					.SORT(sort, search)}
				includes={`pageSize/${pageSize}`}
			>
				{pageSize}
			</Anchor>
		{/each}
	</nav>
	<span>|</span>
	{#key { current, pageSize, total }}
		<Pages
			{total}
			{current}
			{pageSize}
			route={(current) =>
				routes.LAUNCHES.CURRENT(current)
					.PAGE_SIZE(pageSize)
					// @ts-ignore
					.UPCOMING(upcoming)
					// @ts-ignore
					.SORT(sort, search)}
		/>
	{/key}
</section>
<ul>
	{#each data.launches as { id, name, date_utc, logo, details }}
		<li>
			<img src={logo ?? avatar} alt={name} />
			<div>
				<span>
					<a href={routes.LAUNCH(id)}>{name}</a>
				</span>
				<span>
					{date_format({
						date: date_utc,
						tz: data.timezone,
						template: 'MMM D YYYY, h:mm:ss A, Z'
					})}
				</span>
				<p>{@html details}</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul,
	div {
		display: flex;
		flex-direction: column;
	}
	div {
		flex-grow: 1;
	}
	li,
	section {
		display: flex;
		flex-direction: row;
	}
	ul {
		gap: 2em;
	}
	li {
		padding: 1em;
		height: 10em;
	}
	div,
	li,
	section {
		gap: 1em;
	}
	section {
		flex-wrap: wrap;
	}
	img {
		width: 10em;
		object-fit: scale-down;
	}
</style>
