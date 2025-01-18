<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	/**
	 * @type {{
	 * 	tags: string[];
	 * 	blogs: {
	 * 		alt: any;
	 * 		thumbnail: any;
	 * 		id: any;
	 * 		date: string;
	 * 		title: string;
	 * 		created: string;
	 * 		tags: string[] | undefined;
	 * 		excerpt: string;
	 * 		image_html_render: string | undefined;
	 * 	}[];
	 * }}
	 */
	const { tags, blogs, children } = $props();

	let blogs_with_preview_imgs = [...blogs];

	let tags_state = $state(
		tags.sort().map((/** @type string* */ v) => [v, true]) ?? [],
	);

	const toggle_filter = (/** @type Event * */ event) => {
		console.log(event.target.textContent);
		tags_state = /** @type {[string, boolean][]} */ ([
			...tags_state.filter(
				(v) =>
					v[0] !=
					/** @type HTMLElement * */ (event.target).textContent,
			),
			[
				/** @type HTMLElement * */ (event.target).textContent ?? '',
				!(tags_state.find(
					(v) =>
						v[0] ==
						/** @type HTMLElement * */ (event.target).textContent,
				) ?? ['', false])[1],
			],
		]).toSorted((a, b) => (a.at(0) + '').localeCompare(b.at(0) + ''));
	};

	let blogs_state = $derived(
		blogs_with_preview_imgs.filter(({ tags }) =>
			tags.some((/** @type string */ t) =>
				tags_state.some(([k, v]) => k == t && v),
			),
		),
	);
	/** @type {HTMLDivElement} */
	let images_comp;

	onMount(() => {
		[...images_comp.children].forEach(
			(n) =>
				(blogs_with_preview_imgs.find(
					(v) => v.id == n.firstChild.id,
				).image_html_render = n.innerHTML),
		);
		images_comp.remove();
	});
</script>

<div class="filter-chips">
	{#each tags_state as [title, activated] (title)}
		<button class:activated onclick={toggle_filter}>
			<span>{title}</span>
		</button>
	{/each}
</div>

<div class="blogs">
	{#each blogs_state as { title, created, tags, excerpt, id, image_html_render } (id)}
		<a class="card" href="/blogs/{id}" animate:flip>
			<div class="thumbnail-wrapper">
				{#if image_html_render}
					{@html image_html_render}
				{:else}
					<div class="card-thumbnail fallback" out:slide>
						{title.split('').slice(0, 2).join('')}
					</div>
				{/if}
			</div>
			<dl>
				<dt>
					<strong>{title}</strong>
				</dt>
				<dd>
					<small>{excerpt}</small>
				</dd>
				<dt>Published at</dt>
				<dd>
					<time datetime={created}
						>{created.toLocaleDateString('en-US', {
							day: '2-digit',
							month: 'short',
							year: 'numeric',
						})}
					</time>
				</dd>
				{#if tags}
					<dt>Tags:</dt>
					<dd>{tags.join(', ')}</dd>
				{/if}
			</dl>
		</a>
	{/each}
</div>

<div bind:this={images_comp} class="hidden">
	{@render children?.()}
</div>

<style lang="scss">
	$card-gaps: 1.5rem;
	.blogs {
		display: grid;
		gap: 0.75rem;
		margin-bottom: calc(1.5rem * 2);
	}
	.card {
		width: 100%;
		height: calc(100vh / 5);
		aspect-ratio: 3/1;
		border-radius: 13px;
		display: grid;
		padding: 1rem;
		grid-template: auto / 50% 1fr;
		gap: $card-gaps;
		&:hover {
			background-color: var(--surface);
		}
	}

	.thumbnail-wrapper {
		display: flex;
		height: 100%;
		aspect-ratio: 3/2;
		overflow: hidden;
		border-radius: 13px;
		min-height: 17vh;
	}

	:global(picture.card-thumbnail img),
	.card-thumbnail {
		object-fit: cover;
		width: 100%;
		font-size: var(--step-8);
		font-weight: bold;
		text-indent: 1.5rem;
		letter-spacing: 1.5rem;
		display: grid;
		place-items: center;
		text-transform: uppercase;
		&.fallback {
			background-color: var(--p-surface);
		}
	}

	dl {
		display: grid;
		gap: 0.1rem;
	}

	dt {
		text-transform: uppercase;
		font-size: 0.8rem;
		opacity: 0.8;
		top: 0.2em;
		color: var(--pink);
	}

	dd {
		color: var(--text);
		font-size: 0.9rem;
		margin: 0;
	}

	@media screen and (max-width: 730px) {
		.card {
			grid-template: 50% 1fr / auto;
			aspect-ratio: unset;
			height: auto;
		}
		.thumbnail-wrapper {
			place-self: center;
		}
	}

	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		align-content: center;
		justify-content: center;
		padding: 0.25rem 0.75rem;
	}

	button {
		display: flex;
		background: var(--crust);
		color: var(--maroon);
		padding: 0.3rem 0.5rem;
		border: none;
		margin: 0.25rem;
		border-radius: 1rem;
		font-weight: normal;
		transition: all 150ms ease-in-out;
		animation: jump 350ms cubic-bezier(0.5, 0, 0.5, 1);

		& > span {
			place-self: center;
		}

		&:hover {
			color: var(--red);
			opacity: 1;
			cursor: pointer;
		}

		&.activated {
			animation: boong 700ms linear forwards;
			background: var(--rosewater);
			color: var(--crust);
			font-weight: bold;
		}

		@keyframes jump {
			from {
				transform: none;
			}

			50% {
				transform: translateY(-100%);
			}

			90% {
				transform: translateY(0) scaleY(0.8);
			}
		}

		@keyframes boong {
			40% {
				transform: scale(1.5, 0.5);
			}

			50% {
				transform: scale(0.5, 1.5);
			}

			60% {
				transform: scale(1.3, 0.6);
			}

			70% {
				transform: scale(0.8, 1.2);
			}

			100% {
				transform: scale(1, 1);
			}
		}
	}
</style>
