import sidebar from "./sidebar";
import head from "./head";
import nav from "./nav";
import markdown from "./markdown";
import lang from "./lang";
const config = {
  title: "Blog空间",
  description: "记录日常",
  head,
  markdown,
  themeConfig: {
    algolia: {
      appKey: "",
      indexName: "",
      searchParameters: {
        faeFilters: ["tags:guide,api"],
      },
    },
    sidebar,
    nav,
    demoblock: lang,
    logo: "../../assets/small.png",
  },
};

export default config;
