<script>
	import { theme } from 'states/theme';
	import { onDestroy, onMount } from 'svelte';
	const { hero_url, hero_alt, hero_css } = $props();

	/** @type HTMLIFrameElement */
	let iframe;

	let loaded = $state(false);

	/** @type number */
	let g_id;

	if (hero_css) {
		/** @type {(function(): void) | null} */
		let unsubscribe = null;

		const on_iframe_load = () => {
			if (!unsubscribe) {
				const iframe_doc =
					iframe.contentDocument ?? iframe.contentWindow?.document;

				if (!!iframe_doc && iframe_doc?.readyState == 'complete') {
					const iframe_elem = iframe_doc.querySelector('body');

					// If does not have children => not load completely
					if (iframe_elem?.children.length ?? false) {
						loaded = true;
						theme.subscribe()((s) => {
							switch (s.theme) {
								case 'light':
									return on_theme_change(
										hero_css?.light ?? '',
										iframe_elem,
									);
								case 'dark':
									return on_theme_change(
										hero_css?.dark ?? '',
										iframe_elem,
									);
								case 'system':
									return on_theme_change(
										hero_css?.sys ?? '',
										iframe_elem,
									);
								default:
									return;
							}
						});
					}
				}
			}
		};

		// A hack to set css in iframe at runtime
		// onload on iframe not working as expected

		const on_banner_theme_change = () => {
			if (loaded) {
				cancelAnimationFrame(g_id);
				return;
			}
			on_iframe_load();
			g_id = requestAnimationFrame(on_banner_theme_change);
		};

		onMount(on_banner_theme_change);

		onDestroy(() => (unsubscribe ? unsubscribe() : null));
	}

	function on_theme_change(
		/** @type {string} */ css,
		/** @type {HTMLElement | null} */ iframe_elem,
	) {
		if (iframe_elem) {
			iframe_elem.style.cssText = css;
		}
	}
</script>

<iframe
	id="banner-iframe"
	src={hero_url}
	title={hero_alt}
	loading="lazy"
	bind:this={iframe}
></iframe>

<style>
	#banner-iframe {
		height: 100%;
		width: 100%;
		overflow: hidden;
		border: 0;
	}
</style>
