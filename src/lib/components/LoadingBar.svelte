<script lang="ts">
	import { onMount } from 'svelte';
	let progressBar: HTMLDivElement;

	onMount(() => {
		let progress = 0;
		let step = 0.3;
		const interval = setInterval(function () {
			progress += step;
			const p =
				Math.round((Math.atan(progress) / (Math.PI / 2)) * 100 * 1000) / 1000;
			progressBar.style.width = `${p}%`;
			p >= 100 && clearInterval(interval);
		}, 1000 / 60);
		return () => clearInterval(interval);
	});
</script>

<div bind:this={progressBar} />

<style lang="sass">
    @import './LoadingBar.sass'
</style>
