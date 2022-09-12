<script lang="ts">
	import { date_format } from '$lib/utils';
	import { onDestroy } from 'svelte';
	export let tz: string;

	let now = Date.now();
	let timer = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(timer));
</script>

<div>
	{date_format({ date: now, tz, template: 'MMMM DD YYYY' }).toUpperCase()}
</div>
<div>
	{date_format({ date: now, tz, template: 'hh:mm:ss A, Z' }).toUpperCase()}
</div>
