import { scanDir } from './util'

export default {
	'/': scanDir('article'),
	'/watermark/': scanDir('watermark'),
	'/snowtiny/': scanDir('snowtiny'),
	'/snow-react-markdown/': scanDir('snow-react-markdown'),
	'/life/': scanDir('life'),
	'/react/': scanDir('react'),
	'/deep-learning/': scanDir('deep-learning'),
	'/reading/': scanDir('reading'),
	'/job/': scanDir('job'),
	'/TDD/': scanDir('TDD'),
}
