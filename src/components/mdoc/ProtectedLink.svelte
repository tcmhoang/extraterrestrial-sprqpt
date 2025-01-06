<script>
	import { onMount } from 'svelte';

	let { href, title = '', children } = $props();

	const encrypted = '[protected info]';

	/** @type HTMLAnchorElement */
	let link;

	onMount(() => {
		link.acc.href = href;
		link.title = title;
		if (!children) {
			link.textContent = title;
		}
	});
</script>

<a bind:this={link} href="/" title={encrypted}>
	{#if children}
		{@render children()}
	{:else}
		{encrypted}
	{/if}
</a>
