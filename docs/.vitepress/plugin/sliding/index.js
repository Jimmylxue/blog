import { getChildNodes, addAnimate } from './util'
import 'animate.css'

const observers = []

const isElementInViewport = element => {
	var rect = element.getBoundingClientRect()
	const isInViewport =
		rect.top >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	return isInViewport
}

const checkHasAttribute = element => {
	return !!element.getAttribute('data-snow_is_show')
}

export function initFirstScreen() {
	console.log('comming~~')
	const main = document.querySelector('.vp-doc>div') || []
	const paragraphs = getChildNodes(main)
	paragraphs.forEach(item => {
		item.removeAttribute('data-snow_is_show')
		if (isElementInViewport(item)) {
			item.setAttribute('data-snow_is_show', true)
			addAnimate(item, true)
		}
	})
}

export function animateFn() {
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

export function destructionObserver() {
	observers.forEach(observe => {
		observe.disconnect()
	})
	observers.length = 0
}
