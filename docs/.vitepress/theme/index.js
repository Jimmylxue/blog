// .vitepress/theme/index.js
import Layout from "./Layout.vue";
import DefaultTheme from "vitepress/dist/client/theme-default";
import { registerComponents } from "./register-components.js";

export default {
  Layout,
  ...DefaultTheme,
  NotFound: () => "custom 404", // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    registerComponents(app);
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
};
