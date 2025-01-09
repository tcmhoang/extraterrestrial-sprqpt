<script>
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
	 * 	}[];
	 * }}
	 */
	const { tags, blogs } = $props();

	let tags_state = $state(
		tags.sort().map((/** @type string* */ v) => [v, true]) ?? [],
	);

	const toggle_filter = (/** @type Event * */ event) =>
		(tags_state = /** @type {[string, boolean][]} */ ([
			...tags_state.filter(
				(v) =>
					v[0] !=
					/** @type HTMLElement * */ (event.target).textContent,
			),
			[
				/** @type HTMLElement * */ (event.target).textContent ?? '',
				!(tags.find(
					(v) =>
						v[0] ==
						/** @type HTMLElement * */ (event.target).textContent,
				) ?? ['', false])[1],
			],
		]).toSorted((a, b) => (a.at(0) + '').localeCompare(b.at(0) + '')));

	let blogs_state = $derived(
		blogs.filter(({ tags }) =>
			tags.some((/** @type string */ t) =>
				tags_state.some(([k, v]) => k == t && v),
			),
		),
	);
</script>

<div class="filter-chips">
	{#each tags_state as [title, activated]}
		<button class:activated onclick={toggle_filter}>{title}</button>
	{/each}
</div>

<div class="blogs">
	{#each blogs_state as { title, created, tags, excerpt, id, thumbnail } (id)}
		<a class="card" href="/blogs/{id}" transition:slide>
			{#if thumbnail}
				{@render thumbnail()}
			{:else}
				<div class="card-thumbnail fallback">
					{title.split('').slice(0, 2).join('')}
				</div>
			{/if}
			<dl class="card-content">
				<dt class="card-title">
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
						}</time
					>
				</dd>
				{#if tags}
					<dt>Tags:</dt>
					<dd>{tags.join(', ')}</dd>
				{/if}
			</dl>
		</a>
	{/each}
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
		height: auto;
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

	.card-thumbnail {
		width: 100%;
		height: auto;
		aspect-ratio: 3/2;
		object-fit: cover;
		border-radius: 13px;
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

	.filter-chips {
		display: flex;
		gap: 0.25rem;
		align-content: center;
		justify-content: center;
		padding: 0.25rem 0.75rem;
	}

	button {
		display: inline-flex;
		background: var(--crust);
		color: var(--maroon);
		padding: 0.3rem 0.5rem;
		border: none;
		margin: 0.25rem;
		border-radius: 1rem;
		font-weight: normal;
		transition: all 150ms ease-in-out;
		animation: jump 350ms cubic-bezier(0.5, 0, 0.5, 1);

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
