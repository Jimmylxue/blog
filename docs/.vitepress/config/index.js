import sidebar from './sidebar'
import head from './head'
import nav from './nav'
import markdown from './markdown'
import lang from './lang'
const config = {
	title: '前端加油站🧠',
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
		logo: 'https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220326203849385.png', // 网站nav栏logo
		lastUpdated: 'Last Updated',
		author: 'jimmy', //  作者
		authorAvatar: '/small.png', //  作者头像
		record: '闽ICP备2021016313号-1',
	},
}

export default config
