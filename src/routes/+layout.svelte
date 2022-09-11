<script lang="ts">
	import favicon from '$lib/images/favicon.ico';
	import 'modern-normalize/modern-normalize.css';
	import '../app.css';
	const links = [
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
	const gsiteVerification = 'google4a2b4fbf5f6ce867';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="google-site-verification" content={gsiteVerification} />
</svelte:head>

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
