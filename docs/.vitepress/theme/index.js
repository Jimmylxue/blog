// .vitepress/theme/index.js
import { registerComponents } from './register-components.js'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './global.css'

export default {
	...DefaultTheme,
	NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
	enhanceApp({ app, router, siteData }) {
		registerComponents(app)
	},
	setup() {
		const route = useRoute()
		const initZoom = () => {
			// 不显式添加{data-zoomable}的情况下为所有图像启用此功能
			mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
		}
		onMounted(() => {
			initZoom()
		})
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		)
	},
}
