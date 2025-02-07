export async function onRequest(
	/** @type {import('npm:astro').APIContext} */ context,
	/** @type {import('npm:astro').MiddlewareNext} */ next,
) {
	const response = await next();
	const html = await response.text();

	return new Response(html, {
		status: 200,
		headers: {
			...response.headers,
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'X-XSS-Protection': '1; mode=block',
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
		},
	});
}
