import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import async from '../lib/promiseMiddleware'
import createEffects from '../lib/sideEffectsMiddleware'

export function create(reducer, init, enhancers=[], effects=[]) {
	const es = createEffects(effects)
	const enhancer = compose(applyMiddleware(async, thunk, es), ...enhancers)
	return createStore(reducer, init, enhancer)
}
