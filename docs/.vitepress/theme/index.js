// .vitepress/theme/index.js
import { registerComponents } from './register-components.js'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Layout from './Layout.vue'
import './global.css'
import 'animate.css'

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
			animateFn(true)
		})

		function isElementInViewport(element) {
			var rect = element.getBoundingClientRect()
			const isInViewport =
				rect.top >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight)
			return isInViewport
		}

		const checkHasAttribute = element => {
			console.log('check', !!element.getAttribute('snow_is_show'))
			return !!element.getAttribute('snow_is_show')
		}

		const animateFn = (isFirstShow = true) => {
			const main = document.querySelector('.vp-doc>div')
			const paragraphs = [...main.children]
			console.log(paragraphs)

			for (var i = 0; i < paragraphs.length; i++) {
				var paragraph = paragraphs[i]
				const isInViewport = isElementInViewport(paragraph)
				if (isInViewport && !checkHasAttribute(paragraph) && !isFirstShow) {
					paragraph.classList.add('animate__animated')
					paragraph.classList.add('animate__fadeInUp')
					if (isInViewport) {
						element.setAttribute('snow_is_show', true)
					}
				}
			}
		}

		const changeTextStyle = () => {
			window.addEventListener('scroll', () => animateFn(false))
		}
		watch(
			() => route.path,
			() =>
				nextTick(() => {
					initZoom()
					changeTextStyle()
				})
		)
	},
	Layout,
}
