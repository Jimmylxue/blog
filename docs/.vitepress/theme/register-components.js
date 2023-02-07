import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'

console.log(Demo)
export function registerComponents(app) {
	app.component('Demo', Demo)
	app.component('DemoBlock', DemoBlock)
}
