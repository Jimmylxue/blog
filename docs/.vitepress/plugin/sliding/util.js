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

const fadeInLeftElement = ['IMG'] // 标签存大写

/**
 * 判断是否是 需要使用 左滑进入的 元素
 * @param {Element} node
 * @returns {boolean}
 */
function isNeedFadeInLeft(node) {
	/**
	 * vitePress img标签是 包裹在 p标签下的，所以需要做个特殊兼容
	 */
	const depImgTag = [...node.children]?.[0]?.tagName
	return (
		fadeInLeftElement.includes(node.tagName) ||
		fadeInLeftElement.includes(depImgTag)
	)
}

/**
 *
 * @param {Element} node
 * @param {boolean} isInit 是否是初始化时执行
 */
export function addAnimate(node, isInit) {
	if (isNeedFadeInLeft(node)) {
		node.classList.add('animate__animated')
		node.classList.add('animate__fadeInLeft')
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
