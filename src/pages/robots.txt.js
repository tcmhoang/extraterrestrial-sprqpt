const getRobotsTxt = (/** @type URL */ sitemapURL) => `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
Disallow: /*.js$
Disallow: /*.mjs$
Disallow: /*.json
`;

/** @type {import('astro').APIRoute} */
export const GET = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTxt(sitemapURL));
};
