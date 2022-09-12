<script lang="ts">
	import { paginationCalculator } from 'pagination-calculator';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	export let total: number;
	export let current: number;
	export let pageSize: number;
	export let route: (current: number) => string;
	const result = paginationCalculator({
		total,
		current,
		pageSize,
		pageLimit: 10
	});
</script>

<nav>
	{#if result.previous}
		<a href={route(result.previous)}><ChevronLeft /></a>
	{:else}
		<span><ChevronLeft /></span>
	{/if}
	{#each result.pages as page}
		{#if page === '...'}
			<span>...</span>
		{:else if page === current}
			<span>{page}</span>
		{:else}
			<a href={route(page)}>{page}</a>
		{/if}
	{/each}
	{#if result.next}
		<a href={route(result.next)}><ChevronRight /></a>
	{:else}
		<span><ChevronRight /></span>
	{/if}
</nav>
