import { vitePreprocess } from "@astrojs/svelte";
import combineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

export default {
  extensions: [".svelte"],
  preprocess: [
    vitePreprocess({
      style: {
        css: {
          postcss: {
            plugins: [
              purgecss.default({
                content: ["./**/*.css"],
              }),
              postcssPresetEnv({
                features: {
                  "nesting-rules": {
                    noIsPseudoSelector: false,
                  },
                },
                minimumVendorImplementations: 2,
                browsers: "> 1%, last 2 versions, not dead",
              }),
              combineDuplicatedSelectors({
                removeDuplicatedProperties: true,
              }),
              cssnano({
                preset: "default",
              }),
            ],
          },
        },
      },
    }),
  ],
};
