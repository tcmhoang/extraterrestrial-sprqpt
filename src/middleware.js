const security_headers = {
	'Cross-Origin-Embedder-Policy': 'require-corp',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'X-XSS-Protection': '1; mode=block',
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
};

export async function onRequest(
	/** @type {import('npm:astro').APIContext} */ _,
	/** @type {import('npm:astro').MiddlewareNext} */ next,
) {
	const response = await next();
	Object.entries(security_headers).forEach(([header, value]) =>
		response.headers.set(header, value),
	);

	return response;
}
