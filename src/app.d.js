/** @typedef {import('svelte').Component} Component */
/** @typedef {import('astro').ImageMetadata} ImageMetadata */
/** @typedef {import('astro').AsyncRendererComponentFn<unknown>} AstroComponent */
/**
 * @template {object} T
 * @typedef {import('nanostores').PreinitializedMapStore<T> & object} MapStore<Y>
 */

/**
 * @typedef ViewTransitionAPI
 * @property {Function} startViewTransition
 * @param {() => Promise<void> | void} callback
 */

/**
 * Contains Css variables to modify the current theme in the iframe
 *
 * @typedef {Object} CssModifier
 * @property {string} sys - Apply system css
 * @property {string} dark - Apply system css
 * @property {string} light - Apply system css
 */

/**
 * Contains information for constructing the banner instance
 *
 * @typedef {BannerIFrameData | BannerImageData} BannerData
 */

/**
 * Contains information for constructing the banner iframe instance
 *
 * @typedef BannerIFrameData
 * @property {string} hero_url - Url for the hero banner
 * @property {string} hero_alt - Alt text
 * @property {CssModifier} hero_css - Runtime injected css
 */

/**
 * Local imported image via Astro
 *
 * @typedef {Promise<{ default: ImageMetadata }>} LocalImageData - Imported
 *   image for the hero banner
 */

/**
 * Contains information for constructing the banner image instance
 *
 * @typedef BannerImageData
 * @property {LocalImageData} hero_url - Imported image for the hero banner
 * @property {string} hero_alt - Alt text
 * @property {undefined} hero_css - Not applicable just for the lint
 */

/**
 * Contains a personal information to render the Header Component
 *
 * @typedef Detail
 * @property {AstroComponent} icon
 * @property {string} text
 */

/**
 * Contains a link information
 *
 * @typedef Link
 * @property {string} label
 * @property {string} link
 */
/**
 * Contains a link information to render w/ an icon
 *
 * @typedef IconedLink
 * @property {string} label
 * @property {string} link
 * @property {Component} icon
 */

/**
 * @typedef DeviceOrientationIOS
 * @property {() => Promise<'granted' | 'denied'>} requestPermission
 */
