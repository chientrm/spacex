<script lang="ts">
	import { truncate } from '$lib/utils';
	export let id: string;
	export let title: string;
	export let logo: string;
	export let name: string;
</script>

<a class="container" href={`/launch/${id}`} {title}>
	<img src={logo} alt="{name} logo" class="image" />
	<div class="overlay">
		<div class="text">{name}</div>
	</div>
	<div>{truncate(name, 18).toUpperCase()}</div>
</a>

<style lang="sass">
    @import './ImageOverlay.sass'
</style>
