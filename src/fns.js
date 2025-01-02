import { hostname } from '@/consts.js';

export const build_title = (/** @type string */ title) =>
	`${title} • ${hostname}`;
