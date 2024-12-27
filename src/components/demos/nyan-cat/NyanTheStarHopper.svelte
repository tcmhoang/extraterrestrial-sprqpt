<script >
	import { onMount } from 'svelte';
	import Cat from './Cat.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	/** @type number */
	let timeout = $state();

	/** @type HTMLElement */
	let container = $state();

	/** @type import('svelte/motion').Tweened<number> */
	let x = new Tween(0.3, {
		duration: 300,
		easing: cubicOut

	});

	/** @type number */
	let y = $state(0.5);

	/** @type number */
	const k_max = 0.5;
	/** @type number */
	const k_min = 0.3;

	/** @function
	 * @param {PointerEvent} e event fires when moving the pointer
	 * @returns {void}
	 */
	const handle_pointer = (e) => {
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		timeout = window.requestAnimationFrame(() => {
			x.set( Math.min(Math.max(e.clientX / container.clientWidth, k_min), k_max));
			y = e.clientY / container.clientHeight;
		});
	};

	/** @function
	 * @param {DeviceOrientationEvent} e
	 * @returns {void}
	 */

	const handle_orientation = (e) => {
		const { beta, gamma } = e;
		const is_landscape = window.matchMedia('(orientation: landscape)').matches;
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		timeout = window.requestAnimationFrame(() => {
			x.set( Math.min(Math.max((is_landscape ? gamma ?? 0 : beta ?? 0) / 90 + 0.5, k_min), k_max));
		});
	};

	onMount(async () => {
		const mb_ios_orientation_event = /** @type DeviceOrientationIOS*/ (
			/** @type unknown*/ (window.DeviceOrientationEvent)
		);
		const is_ios =
			'requestPermission' in window.DeviceOrientationEvent &&
			typeof mb_ios_orientation_event.requestPermission == 'function';
		let is_supported = !!window.DeviceOrientationEvent;
		if (is_ios) {
			const res = await mb_ios_orientation_event.requestPermission();
			if (res == 'denied') {
				is_supported = false;
			}
		}
		if (is_supported) {
			window.addEventListener('deviceorientation', handle_orientation, true);
		}

		return Promise.resolve(window.removeEventListener('deviceorientation', handle_orientation));
	});
</script>

<div
	class="scene"
	bind:this={container}
	style="--x: {x.current}; --y: {y};"
	onpointermove={handle_pointer}
>
<div class="rainbow"></div>
	<div class="starfield">
		{#each Array(12) as _}
			<div class="star"></div>
		{/each}
	</div>
	<div class="cat">
		<Cat />
	</div>
</div>

<style lang="scss">
        @use 'sass:list';

	$red: #f00;
	$orange: #f90;
	$yellow: #ff0;
	$green: #3f0;
	$blue: #09f;
	$purple: #63f;

	$colors: (
		var(--nyan-r, $red),
		var(--nyan-o, $orange),
		var(--nyan-y, $yellow),
		var(--nyan-g, $green),
		var(--nyan-b, $blue),
		var(--nyan-p, $purple)
	);

	$star_color: var(--nyan-s, white);

	$cat_height: 50%;
	$ncolor: list.length($colors);
	$ar: calc(3 / 1);
	$sheight: calc(100vw / $ar);
	.scene {
		background: radial-gradient(var(--nyan-bg-l, #005093), var(--nyan-bg-d, #002953));
		width: 100%;
		aspect-ratio: $ar;
		position: relative;
		margin: 0;
		overflow: hidden;
		--speed: clamp(0.3, calc(1 - var(--x)), 0.7);
	}

	.rainbow {
		@function _gen2StopTile($c1, $c2) {
			@return linear-gradient(to right, $c1 0%, $c1 50%, $c2 50%, $c2 100%);
		}

		@function render_rainbow() {
			$res: ();
			@each $c in $colors {
				$res: list.append($res, (_gen2StopTile($c, transparent), _gen2StopTile(transparent, $c)), comma);
			}
			@return $res;
		}

		@function render_positions($span) {
			$res: ();
			@for $i from 0 through (list.length($colors) * 2) {
				$res: list.append($res, 0 $i * $span, comma);
			}
			@return $res;
		}

		position: absolute;
		height: calc($cat_height - 5%);
		width: 90%;
		right: 47%;
		top: 28%;
		transform: (
			translate(
				clamp(-40vw, calc(100vw * var(--x) - 50vw), 30vw),
				clamp(calc($sheight * -0.2), calc($sheight * (var(--y) - 0.5)), calc($sheight * 0.2))
			)
		);
		transition: transform 300ms cubic-bezier(0.29, 1.54, 0.68, 0.05);
		overflow: hidden;
		&::after {
			display: block;
			position: inherit;
			content: '';

			right: 0;
			bottom: 0;

			$height_unit: calc(100% / $ncolor);
			$width_unit: clamp(10vw, calc($sheight / 2), 20vw);
			height: 100%;
			width: calc(100% + 10vw);

			background-image: render_rainbow();
			background-position: render_positions(calc($height_unit/2));
			background-size: $width_unit $height_unit;
			background-repeat: repeat-x;

			animation: calc(var(--speed, 0.5) * 2 * 300ms) step-end infinite rainbow;

			@keyframes rainbow {
				from,
				to {
					transform: translateX(10vw);
				}
				50% {
					transform: translateX(0);
				}
			}
		}
	}

	.starfield {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	$star_trails: (
		(66%, 80%),
		(70%, 54%),
		(4%, 31%),
		(49%, 20%),
		(35%, 30%),
		(48%, 29%),
		(22%, 70%),
		(56%, 67%),
		(49%, 20%),
		(9%, 92%),
		(44%, 28%),
		(6%, 25%)
	);

	@for $i from 1 through 12 {
		$star_trail: list.nth($star_trails, $i);
		.star:nth-child(#{$i}) {
			left: calc(list.nth($star_trail, 1) + 30%);
			top: list.nth($star_trail, 2);
			animation: calc(var(--speed) * 0.5 * 2 * 1.3s) ease-in-out calc(1s / $i) infinite whoosh;
			&::after {
				animation-delay: calc(1s / $i);
			}
		}
	}

	@keyframes whoosh {
		from {
			transform: translate(0);
		}
		to {
			transform: translateX(-350%);
		}
	}

	.star {
		position: absolute;
		height: calc(100% / $ncolor * 2);
		aspect-ratio: 1;
		overflow: hidden;

		&::after {
			$factor: 6;
			content: '';
			position: inherit;
			display: block;
			width: calc(100% * $factor);
			height: 100%;

			// 1st: 1, 2nd: 4, 3rd: 4, 4th: 5, 5th: 8, 6th: 4 => tot : 26
			$totsprites: 26;
			$sprites: ();
			@for $_ from 1 through $totsprites {
				$sprites: list.append(
					$sprites,
					linear-gradient(to right, $star_color 0%, $star_color 100%),
					comma
				);
			}

			background-image: $sprites;

			@function factor_position($e, $x, $y) {
				@return calc(100% / $factor * ($e - 1) + $x / $factor) $y;
			}
			$poss: (
				((40%, 50%)),
				((30%, 50%), (50%, 50%), (40%, 40%), (40%, 60%)),
				((20%, 50%), (60%, 50%), (40%, 30%), (40%, 70%)),
				((50%, 50%), (25%, 50%), (75%, 50%), (50%, 25%), (50%, 75%)),
				(
					(10%, 50%),
					(90%, 50%),
	 				(50%, 10%),
					(50%, 90%),
					(25%, 25%),
					(75%, 75%),
					(75%, 25%),
					(25%, 75%)
				),
				((10%, 50%), (90%, 50%), (50%, 10%), (50%, 90%))
			);
			$transformed_poss: ();

			@for $i from 1 through list.length($poss) {
				// fix for weird bug :))
				@if $i == 1 {
					$temp: list.nth($poss, $i);
					$transformed_poss: list.append(
						$transformed_poss,
						factor_position($i, list.nth($temp, 1), list.nth($temp, 2)),
						comma
					);
				} @else {
					@each $p in list.nth($poss, $i) {
						$transformed_poss: list.append(
							$transformed_poss,
							factor_position($i, list.nth($p, 1), list.nth($p, 2)),
							comma
						);
					}
				}
			}

			background-position: $transformed_poss;

			$w: calc(10% / $factor);
			$dw: calc($w * 2);
			$szs: (
				(#{$w} 10%),
				(#{$w} 10%, #{$w} 10%, #{$w} 10%, #{$w} 10%),
				(#{$dw} 10%, #{$dw} 10%, #{$w} 20%, #{$w} 20%),
				(#{$w} 10%, #{$dw} 10%, #{$dw} 10%, #{$w} 20%, #{$w} 20%),
				(#{$w} 10%, #{$w} 10%, #{$w} 10%, #{$w} 10%, #{$w} 10%, #{$w} 10%),
				(#{$w} 10%, #{$w} 10%, #{$w} 10%, #{$w} 10%)
			);

			$flatten_szs: ();
			@each $sz in $szs {
				$flatten_szs: list.append($flatten_szs, $sz, comma);
			}

			background-size: $flatten_szs;
			background-repeat: no-repeat;
			animation-duration: calc(var(--speed, 0.5) * 2 * 1s);
			animation-timing-function: step-end;
			animation-iteration-count: infinite;
			animation-name: spark;

			@mixin move_to($frame) {
				transform: translateX(calc(-100% * $frame / $factor));
			}

			@keyframes spark {
				from,
				to {
					@include move_to(6);
				}

				@for $i from 0 to 6 {
					#{calc(50% + 50% * ($i / 6))} {
						@include move_to($i);
					}
				}
			}
		}
	}

	.cat {
		--c-accelerate: var(--speed);

		position: absolute;
		top: 25%;
		left: 45%;
		transform: translate(
			clamp(-40vw, calc(100vw * var(--x) - 50vw), 30vw),
			clamp(calc($sheight * -0.2), calc($sheight * (var(--y) - 0.5)), calc($sheight * 0.2))
		);
		transition: transform 300ms cubic-bezier(0.29, 1.54, 0.68, 0.05);
		height: $cat_height;
		aspect-ratio: 5/3;
	}
</style>
