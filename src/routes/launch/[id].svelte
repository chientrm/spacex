<script lang="ts">
	import { Avatar } from '$lib/assets';
	import { fromBase64, resizeImageViaUrl } from '$lib/utils';
	import moment from 'moment';
	import FileDocument from 'svelte-material-icons/FileDocument.svelte';
	import PdfBox from 'svelte-material-icons/PdfBox.svelte';
	import Reddit from 'svelte-material-icons/Reddit.svelte';
	import Wikipedia from 'svelte-material-icons/Wikipedia.svelte';
	import type { DTO } from './dto';

	export let data;
	const dto = fromBase64<DTO>(data);

	const srcDoc = `<style>
	*{padding:0;margin:0;overflow:hidden}
	html,body{height:100%}
	img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
	span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;
	color:white;text-shadow:0 0 0.5em black}
	</style>
	<a href="https://www.youtube.com/embed/${dto.youtubeId}?autoplay=1">
	<img src="https://img.youtube.com/vi/${dto.youtubeId}/hqdefault.jpg" alt='${dto.name}'><span>▶</span>
	</a>`;
</script>

<svelte:head>
	<title>{dto.name} | SpaceX Data</title>
	<meta name="description" content={`${dto.name} | ${dto.details}`} />
	<meta property="og:title" content={dto.name} />
	<meta property="og:description" content={`${dto.name} | ${dto.details}`} />
	<meta property="og:image" content={dto.image || Avatar} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="SpaceX Data" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@SpaceX" />
	<meta property="twitter:creator" content="@SpaceX" />
	<meta property="twitter:title" content={dto.name} />
	<meta
		property="twitter:description"
		content={`${dto.name} | ${dto.details}`}
	/>
	<meta property="twitter:image" content={dto.image || Avatar} />
	<meta property="twitter:image:alt" content={dto.name} />
</svelte:head>

<h1>
	{dto.name} - {moment
		.utc(dto.date)
		.local()
		.format('MMM D YYYY, h:mm:ss A, Z')
		.toUpperCase()}
	{#if dto.success}
		<span class="success">Success</span>
	{/if}
	{#if dto.upcoming}
		<span class="upcoming">Upcoming</span>
	{/if}
</h1>
<section id="intro">
	{#if dto.youtubeId}
		<iframe
			src={`https://www.youtube.com/embed/${dto.youtubeId}&autoplay=1`}
			{srcDoc}
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			title={dto.name}
		/>
	{/if}
</section>
{#if dto.details}
	<p>{dto.details}</p>
{/if}
<h2>Description</h2>
<section id="description">
	<a href={`/launchpad/${dto.launchpadId}`}>
		Launchpad: {dto.launchpadName}
	</a>
	<a href={`/rocket/${dto.rocketId}`}>Rocket: {dto.rocketName}</a>
	{#each dto.capsuleIds as id, i}
		<a href={`/capsule/${id}`}>Capsule: {dto.capsuleSerials[i]}</a>
	{/each}
	{#each dto.payloadIds as payloadId, i}
		<a href={`/payload/${payloadId}`}>Payload: {dto.payloadNames[i]}</a>
	{/each}
</section>
<h2>Discussion</h2>
<section id="links">
	{#if dto.campaign}
		<a href={dto.campaign} alt={dto.campaignTitle} target="_blank">
			<Reddit />
			<span>{dto.campaignTitle || 'Campaign'}</span>
		</a>
	{/if}
	{#if dto.recovery}
		<a href={dto.recovery} alt={dto.recoveryTitle} target="_blank">
			<Reddit />
			<span>{dto.recoveryTitle || 'Recovery'}</span>
		</a>
	{/if}
	{#if dto.media}
		<a href={dto.media} alt={dto.mediaTitle} target="_blank">
			<Reddit />
			<span>{dto.mediaTitle || 'Media'}</span>
		</a>
	{/if}
	{#if dto.launch}
		<a href={dto.launch} alt={dto.launchTitle} target="_blank">
			<Reddit />
			<span>{dto.launchTitle || 'Launch'}</span>
		</a>
	{/if}
	{#if dto.presskit}
		<a href={dto.presskit} alt={dto.presskitTitle} target="_blank">
			<PdfBox />
			<span>{dto.presskitTitle || 'Presskit'}</span>
		</a>
	{/if}
	{#if dto.article}
		<a href={dto.article} alt={dto.articleTitle} target="_blank">
			<FileDocument />
			<span>{dto.articleTitle || 'Article'}</span>
		</a>
	{/if}
	{#if dto.wikipedia}
		<a href={dto.wikipedia} alt={dto.wikipediaTitle} target="_blank">
			<Wikipedia />
			<span>{dto.wikipediaTitle || 'Wikipedia'}</span>
		</a>
	{/if}
</section>
<h2>Images</h2>
<section id="images">
	<a href={dto.image || Avatar} alt={dto.name} target="_blank">
		<img id="avatar" src={dto.image || Avatar} alt={dto.name} loading="lazy" />
	</a>
	{#each dto.images as image}
		<a href={image} alt={dto.name} target="_blank">
			<img src={resizeImageViaUrl(image)} alt={dto.name} loading="lazy" />
		</a>
	{/each}
</section>

<style lang="sass">
    @import './[id].sass'
</style>
