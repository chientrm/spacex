<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import Clock from '$lib/components/Clock.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import routes from '$lib/constants/routes';
	import favicon from '$lib/images/favicon.ico';
	import 'modern-normalize/modern-normalize.css';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	const topics = [
		{
			href: routes.COMING_SOON,
			title: 'Detailed info for serialized dragon capsules',
			caption: 'CAPSULES'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about SpaceX as a company',
			caption: 'COMPANY INFO'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info for serialized first stage cores',
			caption: 'CORES'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info on dragon crew members',
			caption: 'CREW'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about dragon capsule versions',
			caption: 'DRAGONS'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about landing pads and ships',
			caption: 'LANDPADS'
		},
		{
			href: routes.LAUNCHES.GET,
			title: 'Detailed info about launches',
			caption: 'LAUNCHES'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about launchpads',
			caption: 'LAUNCHPADS'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about launch payloads',
			caption: 'PAYLOADS'
		},
		{
			href: routes.COMING_SOON,
			title: "Detailed info about Elon's Tesla roadster's current position",
			caption: 'ROADSTER INFO'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about rocket versions',
			caption: 'ROCKETS'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info about ships in the SpaceX fleet',
			caption: 'SHIPS'
		},
		{
			href: routes.STARLINK,
			title: 'Detailed info about Starlink satellites and orbits',
			caption: 'STARLINKS'
		},
		{
			href: routes.COMING_SOON,
			title: 'Detailed info on SpaceX historical events',
			caption: 'HISTORY'
		}
	];
	const gsiteVerification = 'google4a2b4fbf5f6ce867';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="google-site-verification" content={gsiteVerification} />
</svelte:head>

<article>
	<section>
		<aside>
			<a href={routes.HOME}><Logo /></a>
			<ul>
				{#each topics as { href, title, caption }}
					<li>
						<Anchor {href} {title}>{caption}</Anchor>
					</li>
				{/each}
			</ul>
			<h3>{data.timezone?.toUpperCase()}</h3>
			<Clock tz={data.timezone} />
		</aside>
		<main>
			<slot />
		</main>
	</section>

	<footer>
		<div />
		<span>Copyright &copy; {new Date().getFullYear()} - SpaceX Data</span>
		<p>
			<i>
				We are not affiliated, associated, authorized, endorsed by, or in any
				way officially connected with Space Exploration Technologies Corp
				(SpaceX), or any of its subsidiaries or its affiliates. The names SpaceX
				as well as related names, marks, emblems and images are registered
				trademarks of their respective owners.
			</i>
		</p>
	</footer>
</article>

<style>
	article {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	section {
		display: flex;
		flex-direction: row;
		padding: 1em;
	}
	aside {
		display: flex;
		flex-direction: column;
	}
	div {
		height: 1px;
		margin: 1em 0;
		background-color: lightgray;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	a {
		width: 15em;
	}
	footer {
		padding: 1em;
	}
	main {
		display: flex;
		flex-direction: column;
		padding: 1em;
		flex-grow: 1;
	}
</style>
