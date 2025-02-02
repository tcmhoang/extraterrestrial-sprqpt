import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { k_hostname, k_site_description } from "../consts";
import sanitizeHtml from "sanitize-html";
import Markdoc from "@markdoc/markdoc";
import markdoc_config from "../../markdoc.config.mjs";
import astro_config from "../../astro.config.mjs";

/**
 * @type {import('npm:astro').APIRoute}
 */
export const GET = async (
  /** @type {import('npm:astro').APIContext} */
  context,
) => {
  const posts = await getCollection("blog");

  return rss({
    title: k_hostname,
    description: k_site_description,
    site: context.site ?? astro_config.site ?? "",
    customData: `<language>en-us</language>`,

    items: posts.map((post) => ({
      title: post.data.title,
      content: sanitizeHtml(
        Markdoc.renderers.html(
          Markdoc.transform(
            Markdoc.parse(post.body ?? ""),
            /** @type import('npm:@markdoc/markdoc@^0.4.0').Config)*/ (
              markdoc_config
            ),
          ),
        ),
        {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        },
      ).replaceAll(/\&lt;(\[object Object]).*?&gt;/gs, ""),
      pubDate: post.data.created,
      link: `/blog/${post.id}/`,
      ...post.data,
    })),
  });
};

