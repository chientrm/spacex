<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let title: string | undefined = undefined;
	export let startsWith = false;
	export let includes = 'dummy';
	$: is_text = startsWith
		? $page.url.pathname.startsWith(href)
		: includes
		? $page.url.pathname.includes(includes)
		: $page.url.pathname === href;
</script>

{#if is_text}
	<span><slot /></span>
{:else}
	<a {href} {title}><slot /></a>
{/if}
