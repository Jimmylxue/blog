class InfiniteScroll {
	/**
	 * 滚动的容器
	 */
	dom = undefined

	/**
	 * 位于滚动容器最底部，监听这个DOM来判断是否滚动到最底部
	 */
	sentinel = undefined

	/**
	 * 监听器
	 */
	observer = undefined

	constructor(domId, options) {
		this.dom = document.getElementById(domId)
		this.options = options
		this.isLoading = false
		this.hasMore = true
		this.init()
	}

	init() {
		this.createSentinel()
		this.setupObserver()
	}

	createSentinel() {
		this.sentinel = document.createElement('div')
		this.sentinel.style.height = '1px'
		this.sentinel.style.visibility = 'hidden'
		this.dom.appendChild(this.sentinel)
	}

	setupObserver() {
		this.observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				this.loadMore()
			}
		})

		this.observer.observe(this.sentinel)
	}

	async loadMore() {
		try {
			await this.options.onLoadMore()
		} catch (error) {
			this.options.onError?.(error)
		} finally {
			this.options.onSettle?.(error)
		}
	}

	/**
	 * 卸载时记得调用 否则造成内存泄漏
	 */
	destroy() {
		this.observer?.disconnect()
		this.sentinel?.remove()
	}
}
