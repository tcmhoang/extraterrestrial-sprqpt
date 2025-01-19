import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
export default defineMarkdocConfig({
  tags: {
    cv: {
      render: component("./src/components/nodes/CV.astro"),
      attributes: {
        full_name: { type: String },
        title: { type: String },
        infos: { type: Array },
      },
    },
    link_me: {
      render: component("./src/components/nodes/LinkMe.astro"),
    },
  },
});

