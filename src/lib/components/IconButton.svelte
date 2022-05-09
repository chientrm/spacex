<script lang="ts">
	export let disabled: boolean;
</script>

{#if disabled}
	<span><slot /></span>
{:else}
	<span class="enabled" on:click><slot /></span>
{/if}

<style lang="sass">
    @import './IconButton.sass'
</style>
