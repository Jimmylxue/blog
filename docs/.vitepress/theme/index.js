import { registerComponents } from './register-components.js'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Layout from './Layout.vue'
import './global.css'
import 'animate.css'
import { addAnimate, getChildNodes } from './utils.js'

const observers = []

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
			initFirstScreen()
			animateFn(true)
		})

		const isElementInViewport = element => {
			var rect = element.getBoundingClientRect()
			const isInViewport =
				rect.top >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight)
			return isInViewport
		}

		const checkHasAttribute = element => {
			return !!element.getAttribute('data-snow_is_show')
		}

		const initFirstScreen = () => {
			const main = document.querySelector('.vp-doc>div') || []
			const paragraphs = getChildNodes(main)
			paragraphs.forEach(item => {
				item.removeAttribute('data-snow_is_show')
				if (isElementInViewport(item)) {
					item.setAttribute('data-snow_is_show', true)
					addAnimate(item)
				}
			})
		}

		const animateFn = () => {
			const main = document.querySelector('.vp-doc>div') || []
			const paragraphs = getChildNodes(main)
			paragraphs.forEach(item => {
				const observer = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting && !checkHasAttribute(item)) {
							// 元素进入视口
							addAnimate(item)
							item.setAttribute('data-snow_is_show', true)
						}
					})
				})
				observer.observe(item)
				observers.push(observer)
			})
		}

		const destructionObserver = () => {
			observers.forEach(observe => {
				observe.disconnect()
			})
			observers.length = 0
		}
		watch(
			() => route.path,
			() =>
				nextTick(() => {
					initZoom()
					destructionObserver()
					initFirstScreen()
					animateFn()
				})
		)
	},
	Layout,
}
