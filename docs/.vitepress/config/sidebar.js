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
	'/front-end-case/': scanDir('front-end-case'),
	'/front-end/': scanDir('front-end'),
	'/aboutMe/': scanDir('aboutMe'),
	'/back-end/': scanDir('back-end'),
	'/toss/': scanDir('toss'),
}
