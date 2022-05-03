<script lang="ts">
	export let icon: string;
	export let disabled: boolean;
</script>

{#if disabled}
	<span class="material-icons">{icon}</span>
{:else}
	<span class="material-icons enabled" on:click>{icon}</span>
{/if}

<style lang="sass">
    @import './IconButton.sass'
</style>
