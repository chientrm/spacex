<script lang="ts">
	import 'normalize.css';
	import '../app.sass';
	import './__layout.sass';
	// @ts-ignore
	import SpaceX from '$lib/assets/spacex.png?w=200&webp';
	import Clock from '$lib/components/Clock.svelte';

	const links: Link[] = [
		{
			href: '/',
			title: 'SpaceX Data Homepage',
			caption: 'Home'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info for serialized dragon capsules',
			caption: 'Capsules'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about SpaceX as a company',
			caption: 'Company Info'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info for serialized first stage cores',
			caption: 'Cores'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info on dragon crew members',
			caption: 'Crew'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about dragon capsule versions',
			caption: 'Dragons'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about landing pads and ships',
			caption: 'Landpads'
		},
		{
			href: '/launches',
			title: 'Detailed info about launches',
			caption: 'Launches'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about launchpads',
			caption: 'Launchpads'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about launch payloads',
			caption: 'Payloads'
		},
		{
			href: '/coming-soon',
			title: "Detailed info about Elon's Tesla roadster's current position",
			caption: 'Roadster info'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about rocket versions',
			caption: 'Rockets'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about ships in the SpaceX fleet',
			caption: 'Ships'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info about Starlink satellites and orbits',
			caption: 'Starlink'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info on SpaceX historical events',
			caption: 'History'
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
		<img src={SpaceX} alt="SpaceX Data" />
		<input type="text" placeholder="Search" />
		<ul>
			{#each links as link (link.caption)}
				<li>
					<a href={link.href} title={link.title}>{link.caption}</a>
				</li>
			{/each}
			<li><h3>{Intl.DateTimeFormat().resolvedOptions().timeZone}</h3></li>
		</ul>
		<Clock />
	</aside>
	<slot />
</main>
