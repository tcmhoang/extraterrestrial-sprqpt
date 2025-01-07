<script>
	import { onMount } from 'svelte';

	let { href, title = '', children } = $props();

	let obsecured_href = $state('/');
	let obsecured_title = $state('[protected info]');

	onMount(() => {
		obsecured_href = href;
		obsecured_title = title;
	});
</script>

<a href={obsecured_href} title={obsecured_title}>
	{#if children}
		{@render children()}
	{:else}
		{obsecured_title}
	{/if}
</a>
