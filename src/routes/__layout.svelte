<script lang="ts">
	// @ts-ignore
	import Clock from '$lib/components/Clock.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import '../app.sass';

	const links: Link[] = [
		{
			href: '/',
			title: 'SpaceX Data Homepage',
			caption: 'HOME'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info for serialized dragon capsules',
			caption: 'CAPSULES'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about SpaceX as a company',
			caption: 'COMPANY INFO'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info for serialized first stage cores',
			caption: 'CORES'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info on dragon crew members',
			caption: 'CREW'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about dragon capsule versions',
			caption: 'DRAGONS'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about landing pads and ships',
			caption: 'LANDPADS'
		},
		{
			href: '/launches',
			title: 'Detailed info about launches',
			caption: 'LAUNCHES'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about launchpads',
			caption: 'LAUNCHPADS'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about launch payloads',
			caption: 'PAYLOADS'
		},
		{
			href: '/coming-soon',
			title: "Detailed info about Elon's Tesla roadster's current position",
			caption: 'ROADSTER INFO'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about rocket versions',
			caption: 'ROCKETS'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about ships in the SpaceX fleet',
			caption: 'SHIPS'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about Starlink satellites and orbits',
			caption: 'STARLINK'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info on SpaceX historical events',
			caption: 'HISTORY'
		}
	];
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<aside>
		<a href="/"><Logo /></a>
		<ul>
			{#each links as link (link.caption)}
				<li>
					<a href={link.href} title={link.title}>{link.caption}</a>
				</li>
			{/each}
			<li>
				<h3>
					{Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase()}
				</h3>
			</li>
		</ul>
		<Clock />
	</aside>
	<slot />
</main>

<style lang="sass">
	@import 'normalize.css'
	@import './__layout.sass'
</style>
