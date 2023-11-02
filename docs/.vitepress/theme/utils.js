const secondErgodicTags = ['UL', 'BLOCKQUOTE'] // 标签存大写

/**
 * @param {Element} node
 * @returns {boolean}
 */
function isNeedSecondErgodic(node) {
	return secondErgodicTags.includes(node.tagName)
}

/**
 * @param {HTMLDivElement} node
 * @returns {Element[]}
 */
export function getChildNodes(node) {
	const nodeList = []
	const firstHierarchy = [...(node.children || [])]
	firstHierarchy.forEach(item => {
		if (isNeedSecondErgodic(item)) {
			;[...item.children].forEach(it => {
				nodeList.push(it)
			})
		} else {
			nodeList.push(item)
		}
	})
	return nodeList
}

const fadeInLeftElement = ['Img'] // 标签存大写

/**
 * @param {Element} node
 * @returns {boolean}
 */
function isNeedFadeInLeft(node) {
	return fadeInLeftElement.includes(node.tagName)
}

/**
 *
 * @param {Element} node
 * @param {boolean} isInit 是否是初始化时执行
 */
export function addAnimate(node, isInit) {
	if (isNeedFadeInLeft(node)) {
		node.classList.add('animate__animated')
		node.classList.add('animate__fadeInDown')
		return
	}
	if (isInit) {
		node.classList.add('animate__animated')
		node.classList.add('animate__fadeInDown')
	} else {
		node.classList.add('animate__animated')
		node.classList.add('animate__fadeInUp')
	}
}
