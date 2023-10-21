// .vitepress/theme/index.js
import { registerComponents } from './register-components.js'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Layout from './Layout.vue'
import Granim from 'Granim'
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
		const recoverFont = () => {
			// console.log('aaaaa')
			const aList = document.querySelectorAll('a')
			console.log('aaa', aList)
			for (let i = 0; i < aList.length; i++) {
				const aElement = aList[i]

				// 创建一个新的<canvas>元素
				const canvasElement = document.createElement('canvas')

				canvasElement.width = aElement.offsetWidth
				canvasElement.height = aElement.offsetHeight

				// 使用CSS属性将<canvas>元素完整覆盖在<a>元素上面
				canvasElement.style.position = 'absolute'
				canvasElement.style.top = aElement.offsetTop + 'px'
				canvasElement.style.left = aElement.offsetLeft + 'px'

				const id = `recover_id_${i}`
				canvasElement.id = id
				// canvasElement.classList.add('recover_font')

				// 将<canvas>元素插入到<a>元素之后
				aElement.parentNode.insertBefore(canvasElement, aElement.nextSibling)

				new Granim({
					element: `#${id}`,
					direction: 'left-right',
					states: {
						'default-state': {
							gradients: [
								['#EB3349', '#F45C43'],
								['#FF8008', '#FFC837'],
								['#4CB8C4', '#3CD3AD'],
								['#24C6DC', '#514A9D'],
								['#FF512F', '#DD2476'],
								['#DA22FF', '#9733EE'],
							],
							transitionSpeed: 2000,
						},
					},
				})

				const ele = document.getElementById(id)

				const base64 = ele.toDataURL()
			}
		}
		onMounted(() => {
			initZoom()
			recoverFont()
		})
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		)
	},
	Layout,
}
