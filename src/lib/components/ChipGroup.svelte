<script lang="ts">
	export let group: string[];
	export let index: number;
</script>

<div>
	{#each group as name, i}
		<label class:selected={i === index}>
			<input type="radio" bind:group={index} value={i} />
			{name}
		</label>
	{/each}
</div>

<style lang="sass">
    @import './ChipGroup.sass'
</style>
