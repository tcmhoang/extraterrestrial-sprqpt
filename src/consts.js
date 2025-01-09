// Banner Default Info
const nyan_css = {
	sys: '',
	dark: `
		--nyan-r: var(--d-red);
		--nyan-o: var(--d-orange);
		--nyan-y: var(--d-yellow);
		--nyan-g: var(--d-green);
		--nyan-b: var(--d-blue);
		--nyan-p: var(--d-purple);
		--nyan-s: var(--d-subtext);
		--nyan-bg-l: var(--d-surface);
		--nyan-bg-d: var(--d-crust);

		--c-bread: var(--d-peach);
		--c-eyes: var(--d-crust);
		--c-tart: var(--d-flamingo);
		--c-topping: var(--d-pink);
		--c-fur: var(--d-surface);
		--c-cheeck: var(--d-rosewater);
		--c-shape: var(--d-text);
		`,
	light: `
		--nyan-r: var(--l-red);
		--nyan-o: var(--l-orange);
		--nyan-y: var(--l-yellow);
		--nyan-g: var(--l-green);
		--nyan-b: var(--l-blue);
		--nyan-p: var(--l-purple);
		--nyan-s: var(--l-surface);
		--nyan-bg-l: var(--l-surface);
		--nyan-bg-d: var(--l-crust);

		--c-bread: var(--l-peach);
		--c-eyes: var(--l-crust);
		--c-tart: var(--l-flamingo);
		--c-topping: var(--l-pink);
		--c-fur: var(--l-surface);
		--c-cheeck: var(--l-rosewater);
		--c-shape: var(--l-text);
		`,
};

const nyan_url = `/demos/nyan-cat`;

const nyan_alt = "Conrad's CSS Nyan Cat Demo";

export const k_banner_data = {
	hero_url: nyan_url,
	hero_alt: nyan_alt,
	hero_css: nyan_css,
};

// Page Info

import BriefcaseIcon from 'components/icons/BriefcaseIcon.svg';
import BirthdayIcon from 'components/icons/BirthdayIcon.svg';
import BlogIcon from 'components/icons/BlogIcon.svg';
import PositionLocationIcon from 'components/icons/PositionLocationIcon.svg';

export const k_hostname = 'SPRQPT';

export const build_title = (/** @type string */ title) =>
	`${title} • ${k_hostname}`;

export const k_default_header_props = {
	deets: [
		{
			text: 'Available',
			icon: BriefcaseIcon,
		},
		{
			text: 'September 25th',
			icon: BirthdayIcon,
		},
		{
			text: '/blogs',
			icon: BlogIcon,
		},
		{
			text: 'Global',
			icon: PositionLocationIcon,
		},
	],

	summary: [
		'On the mission to spice up the web, pixel by pixel ✨',
		'Software Admiral 🎖️, Inspiring Rubber Quack-tivist 🦆, Mayhem Mender 🩹, Bug Sleuth 🔍',
	],
};

// Tab routes

export const k_home_tab_data = {
	label: 'Feed',
	link: `/`,
};

// Link me!
import GithubIcon from 'components/icons/GithubIcon.svg';
import KeybaseIcon from 'components/icons/KeybaseIcon.svg';
import ResumeIcon from 'components/icons/ResumeIcon.svg';
import RssIcon from 'components/icons/RssIcon.svg';
import ScheduleIcon from 'components/icons/ScheduleIcon.svg';
import WebsiteIcon from 'components/icons/WebsiteIcon.svg';

export const k_links = [
	{ content: 'Website', link: '/', icon: WebsiteIcon },
	{ content: 'RSS', link: '/rss.xml', icon: RssIcon },
	{ content: 'Resumé', link: '/resume', icon: ResumeIcon },
	{
		content: 'Keybase',
		link: 'https://keybase.io/tcmhoang',
		icon: KeybaseIcon,
	},
	{
		content: 'Github',
		link: 'https://github.com/tcmhoang',
		icon: GithubIcon,
	},
	{
		content: 'Schedule a call',
		link: 'https://calendly.com/tcmhoang/30min',
		icon: ScheduleIcon,
	},
];

export const k_emoji_regex =
	/[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\?/g;

const img_map = new Map([
	[
		'20240202-my-setup',
		{
			fetcher: async () => await import('./assets/danang-2021.png'),
			alt: 'A senere view from the balcony back in the day I was in Danang',
		},
	],
]);

export const fetch_blog_image_metadata = (/** @type string */ id) =>
	img_map.get(id);
