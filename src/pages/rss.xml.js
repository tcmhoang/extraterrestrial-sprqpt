import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { k_hostname, k_site_description } from '../consts';
import sanitizeHtml from 'sanitize-html';
import Markdoc from '@markdoc/markdoc';
import markdoc_config from '../../markdoc.config.mjs';
import { format_date } from '../fns.js';
import { k_author, k_avatar_url } from '../consts.js';

/** @type {import('npm:astro').APIRoute} */
export const GET = async () => {
	const posts = (await getCollection('blog')).toSorted(
		(a, b) => b.data.created.valueOf() - a.data.created.valueOf(),
	);

	const url = 'https://sprqpt.com';
	const build_date = format_date(new Date());
	const pub_date = format_date(posts[0].data.date);

	return rss({
		title: k_hostname,
		description: k_site_description,
		site: url,
		trailingSlash: false,
		xmlns: {
			content: 'http://purl.org/rss/1.0/modules/content/',
			wfw: 'http://wellformedweb.org/CommentAPI/',
			dc: 'http://purl.org/dc/elements/1.1/',
			atom: 'http://www.w3.org/2005/Atom',
			sy: 'http://purl.org/rss/1.0/modules/syndication/',
			slash: 'http://purl.org/rss/1.0/modules/slash/',
			georss: 'http://www.georss.org/georss',
			geo: 'http://www.w3.org/2003/01/geo/wgs84_pos#',
		},

		customData: `
		<atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-us</language>
		<copyright>${k_author} ${new Date().getFullYear()}</copyright>
		<docs>https://www.rssboard.org/rss-specification</docs>
		<pubDate>${pub_date}</pubDate>
		<lastBuildDate>${build_date}</lastBuildDate>
		<managingEditor>${k_author}</managingEditor>
		<webMaster>${k_author}</webMaster>
		<image>
			<url>${k_avatar_url}</url>
			<title>${k_author}</title>
			<link>${url}</link>
		</image>

	  `,

		items: posts.map((post) => ({
			...post.data,
			title: post.data.title,
			pubDate: post.data.created,
			link: `${url}blogs/${post.id}/`,
			description: post.data.excerpt,
			author: k_author,
			categories: post.data.tags,
			source: { title: 'Conrad Hoang RSS Feed', url: `${url}rss.xml` },
			content: sanitizeHtml(
				Markdoc.renderers.html(
					Markdoc.transform(
						Markdoc.parse(post.body ?? ''),
						/** @type import('npm:@markdoc/markdoc@^0.4.0').Config) */ (
							markdoc_config
						),
					),
				),
				{
					allowedTags: sanitizeHtml.defaults.allowedTags.concat([
						'img',
					]),
				},
			).replaceAll(/\&lt;(\[object Object]).*?&gt;/gs, ''),
		})),
	});
};
