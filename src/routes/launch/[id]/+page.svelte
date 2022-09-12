<script lang="ts">
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import { date_format, get_small_flickr } from '$lib/utils';
	import avatar from '$lib/images/spacex-avatar.png?webp';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const {
			name,
			date_utc,
			success,
			upcoming,
			youtube_id,
			details,
			launchpad,
			rocket,
			capsules,
			payloads,
			reddits,
			presskit,
			article,
			wikipedia,
			image,
			images
		} = data.launch,
		srcDoc = `<style>
	*{padding:0;margin:0;overflow:hidden}
	html,body{height:100%}
	img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
	span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;
	color:white;text-shadow:0 0 0.5em black}
	</style>
	<a href="${routes.YOUTUBE(youtube_id ?? '')}">
	<img src="https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg" alt='${name}'><span>▶</span>
	</a>`;
</script>

<svelte:head>
	<title>{name} | SpaceX Data</title>
	<meta name="description" content={`${name} | ${details}`} />
	<meta property="og:title" content={name} />
	<meta property="og:description" content={`${name} | ${details}`} />
	<meta property="og:image" content={image || avatar} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@SpaceX" />
	<meta property="twitter:creator" content="@SpaceX" />
	<meta property="twitter:title" content={name} />
	<meta property="twitter:description" content={`${name} | ${details}`} />
	<meta property="twitter:image" content={image || avatar} />
	<meta property="twitter:image:alt" content={name} />
</svelte:head>

<h2>
	{name} - {date_format({
		date: date_utc,
		tz: data.timezone,
		template: 'MMMM D YYYY, h:mm:ss A, Z'
	}).toUpperCase()}
	{#if success}
		<span class="success">{strings.SUCCESS}</span>
	{/if}
	{#if upcoming}
		<span class="upcoming">{strings.UPCOMING}</span>
	{/if}
</h2>

{#if youtube_id}
	<iframe
		src={routes.YOUTUBE(youtube_id)}
		{srcDoc}
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		title={name}
	/>
{/if}

{#if details}
	<p>{details}</p>
{/if}

<h2>{strings.SETUP}</h2>
<table>
	<thead>
		<td>{strings.PART}</td>
		<td>{strings.PART_NAME}</td>
	</thead>
	<tbody>
		{#if launchpad}
			<tr>
				<td>{strings.LAUNCHPAD}</td>
				<td>
					<a href={routes.LAUNCHPAD(launchpad.id)}
						>{launchpad.full_name ?? ''}
					</a>
				</td>
			</tr>
		{/if}
		{#if rocket}
			<tr>
				<td>{strings.ROCKET}</td>
				<td>
					<a href={routes.ROCKET(rocket.id)}>
						{rocket.name}
					</a>
				</td>
			</tr>
		{/if}
		{#each capsules as { id, serial }}
			<tr>
				<td>{strings.CAPSULE}</td>
				<td>
					<a href={routes.CAPSULE(id)}>
						{serial}
					</a>
				</td>
			</tr>
		{/each}
		{#each payloads as { id, name }}
			<tr>
				<td>{strings.PAYLOAD}</td>
				<td>
					<a href={routes.CAPSULE(id)}>
						{name ?? ''}
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>{strings.DISCUSSION}</h2>
<table>
	<thead>
		<td>{strings.FORUM}</td>
		<td>{strings.TITLE}</td>
	</thead>
	<tbody>
		{#if reddits.campain}
			<tr>
				<td>{strings.REDDIT.CAMPAIN}</td>
				<td>
					<a href={reddits.campain.url} target="_blank">
						{reddits.campain.title}
					</a>
				</td>
			</tr>
		{/if}
		{#if reddits.recovery}
			<tr>
				<td>{strings.REDDIT.RECOVERY}</td>
				<td>
					<a href={reddits.recovery.url} target="_blank">
						{reddits.recovery.title}
					</a>
				</td>
			</tr>
		{/if}
		{#if reddits.media}
			<tr>
				<td>{strings.REDDIT.MEDIA}</td>
				<td>
					<a href={reddits.media.url} target="_blank">
						{reddits.media.title}
					</a>
				</td>
			</tr>
		{/if}
		{#if reddits.launch}
			<tr>
				<td>{strings.REDDIT.LAUNCH}</td>
				<td>
					<a href={reddits.launch.url} target="_blank">
						{reddits.launch.title}
					</a>
				</td>
			</tr>
		{/if}
		{#if presskit}
			<tr>
				<td>{strings.PRESSKIT}</td>
				<td><a href={presskit.url} target="_blank">{presskit.title}</a></td>
			</tr>
		{/if}
		{#if article}
			<tr>
				<td>{strings.ARTICLE}</td>
				<td><a href={article.url} target="_blank">{article.title}</a></td>
			</tr>
		{/if}
		{#if wikipedia}
			<tr>
				<td>{strings.WIKIPEDIA}</td>
				<td><a href={wikipedia.url} target="_blank">{wikipedia.title}</a></td>
			</tr>
		{/if}
	</tbody>
</table>

<h2>{strings.GALLERY}</h2>
<section>
	<a href={image || avatar} alt={image} target="_blank">
		<img
			id="avatar"
			src={image ? get_small_flickr(image) : avatar}
			alt={name}
			loading="lazy"
		/>
	</a>
	{#each images as image}
		<a href={image} alt={name} target="_blank">
			<img src={get_small_flickr(image)} alt={name} loading="lazy" />
		</a>
	{/each}
</section>

<style>
	span {
		color: white;
		padding: 0.5em;
	}
	span.success {
		background-color: green;
	}
	span.upcoming {
		background-color: blue;
	}
	iframe {
		height: 20em;
		width: 30em;
		object-fit: scale-down;
	}
</style>
