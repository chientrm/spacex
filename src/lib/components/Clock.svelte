<script lang="ts">
	import moment from 'moment';
	import { onDestroy } from 'svelte';

	let now = Date.now();
	let timer = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(timer));
</script>

<div>{moment(now).format('MMMM DD YYYY')}</div>
<h3>{moment(now).format('hh:mm:ss A, Z')}</h3>
