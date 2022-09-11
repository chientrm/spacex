<script lang="ts">
	import dayjs from 'dayjs';
	import { onDestroy } from 'svelte';

	let now = Date.now();
	let timer = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(timer));
</script>

<div>{dayjs(now).format('MMMM DD YYYY').toUpperCase()}</div>
<h3>{dayjs(now).format('hh:mm:ss A, Z')}</h3>
