<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let title: string | undefined = undefined;
	export let startsWith = false;
	$: is_text = startsWith
		? $page.url.pathname.startsWith(href)
		: $page.url.pathname === href;
</script>

{#if is_text}
	<slot />
{:else}
	<a {href} {title}><slot /></a>
{/if}
