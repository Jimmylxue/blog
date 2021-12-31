import sidebar from './sidebar';
import head from './head';
import nav from './nav';
import markdown from './markdown';
import lang from './lang';
const config = {
  title: '前端加油站',
  description: '学习开发日常记录',
  head,
  markdown,
  themeConfig: {
    search: true, //展示搜索
    algolia: {
      appKey: '',
      indexName: '',
      searchParameters: {
        faeFilters: ['tags:guide,api'],
      },
    },
    sidebar,
    nav,
    demoblock: lang,
    logo: 'http://www.jimmyxuexue.top/small.png',
  },
};

export default config;
