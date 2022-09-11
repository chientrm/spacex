<script lang="ts">
	import Globe from '$lib/components/Globe.svelte';

	import routes from '$lib/constants/routes';

	import strings from '$lib/constants/strings';
	import { date_format } from '$lib/utils';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<svelte:head>
	<title>{strings.TITLE}</title>
	<meta name="description" content={strings.DESCRIPTION} />
</svelte:head>

<section>
	<div>
		<h2>{strings.LAUNCHES}</h2>
		<ul>
			{#each data.launches as { id, name, date_utc }}
				<li>
					<a href={routes.LAUNCH(id)}> {name.toUpperCase()} </a>
					<div>
						{date_format({
							date: date_utc,
							tz: data.timezone,
							template: 'MMM D YYYY, h:mm:ss A, Z'
						}).toUpperCase()}
					</div>
				</li>
			{/each}
		</ul>
		<a href={routes.LAUNCHES}>{strings.ALL_LAUNCHES}</a>
	</div>
	<div>
		<h2>{strings.STARLINKS}</h2>
		<Globe starlinks={data.starlinks} />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		gap: 2em;
	}
	div {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
