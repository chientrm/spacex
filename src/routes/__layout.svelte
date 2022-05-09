<script lang="ts">
	// @ts-ignore
	import Clock from '$lib/components/Clock.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import { navigating } from '$app/stores';
	import LoadingBar from '$lib/components/LoadingBar.svelte';

	let isMobile = true;
	$: showMenu = !isMobile;

	onMount(() => {
		const resize = () =>
			(isMobile = !window.matchMedia('(min-width: 768px)').matches);
		window.onresize = () => resize();
		resize();
	});

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
			href: '/starlinks',
			title: 'Detailed info about Starlink satellites and orbits',
			caption: 'STARLINKS'
		},
		{
			href: '/coming-soon',
			title: 'Detailed info on SpaceX historical events',
			caption: 'HISTORY'
		}
	];
</script>

<svelte:head>
	<style>
		html {
			overflow-y: scroll;
		}
	</style>
</svelte:head>

{#if $navigating}
	<LoadingBar />
{/if}
<main>
	<nav>
		<a href="/"><Logo /></a>
		{#if showMenu}
			<ul transition:slide>
				{#each links as link (link.caption)}
					<li>
						<a href={link.href} title={link.title}>{link.caption}</a>
					</li>
				{/each}
			</ul>
		{/if}
		{#if isMobile}
			<button on:click={() => (showMenu = !showMenu)} aria-label="Toggle Menu">
				{#if showMenu}
					<Close />
				{:else}
					<Menu />
				{/if}
			</button>
		{/if}
		<h3>
			{Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase()}
		</h3>
		<Clock />
	</nav>
	<article>
		<slot />
	</article>
</main>
<footer>
	<span>Copyright &copy; {new Date().getFullYear()} - SpaceX Data</span>
	<p>
		We are not affiliated, associated, authorized, endorsed by, or in any way
		officially connected with Space Exploration Technologies Corp (SpaceX), or
		any of its subsidiaries or its affiliates. The names SpaceX as well as
		related names, marks, emblems and images are registered trademarks of their
		respective owners.
	</p>
</footer>

<style lang="sass" global>
	@import 'normalize.css'
	@import '../font.css'
	@import '../app.sass'
	@import './__layout.sass'
</style>
