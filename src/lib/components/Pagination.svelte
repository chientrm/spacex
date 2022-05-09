<script lang="ts">
	import ChevronDoubleLeft from 'svelte-material-icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from 'svelte-material-icons/ChevronDoubleRight.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';

	import type { Writable } from 'svelte/store';
	import IconButton from './IconButton.svelte';

	export let length: number;
	export let start: Writable<number>;
	export let end: Writable<number>;

	let pageIndex = 0;
	const pageSizes = [15, 30, 45, 60];
	let pageSize = pageSizes[0];
	$: start.set(pageIndex * pageSize);
	$: end.set(Math.min($start + pageSize, length));
	$: lastPage = Math.max(Math.ceil(length / pageSize) - 1, 0);
	$: pageIndex > lastPage && (pageIndex = lastPage);
</script>

<section id="pagination">
	<span>Show</span>
	<select bind:value={pageSize}>
		{#each pageSizes as _pageSize}
			<option value={_pageSize}> {_pageSize} </option>
		{/each}
	</select>
	{$start + 1}-{$end} of {length}
	<div>
		<IconButton on:click={() => (pageIndex = 0)} disabled={pageIndex === 0}>
			<ChevronDoubleLeft />
		</IconButton>
		<IconButton on:click={() => pageIndex--} disabled={pageIndex === 0}>
			<ChevronLeft />
		</IconButton>
		<IconButton on:click={() => pageIndex++} disabled={pageIndex === lastPage}>
			<ChevronRight />
		</IconButton>
		<IconButton
			on:click={() => (pageIndex = lastPage)}
			disabled={pageIndex === lastPage}
		>
			<ChevronDoubleRight />
		</IconButton>
	</div>
</section>

<style lang="sass">
	@import './Pagination.sass'
</style>
