<script lang="ts">
	import dayjs from 'dayjs';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import { onDestroy } from 'svelte';
	export let tz: string;

	dayjs.extend(utc);
	dayjs.extend(timezone);

	let now = Date.now();
	let timer = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(timer));
</script>

<div>{dayjs.tz(now, tz).format('MMMM DD YYYY').toUpperCase()}</div>
<h3>{dayjs.tz(now, tz).format('hh:mm:ss A, Z')}</h3>
