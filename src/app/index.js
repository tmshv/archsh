import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './features/App'
import Project from './features/Project'

import {YMInitializer} from 'react-yandex-metrika'

import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import {Provider} from 'react-redux'
import reducer from './reducers'
import effects from './effects'

import {create} from './store'

import {
	Link,
	Router,
	Route,
	browserHistory,
} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {yandexMetrikaAccount} from '../config'
import {isLandscapeMedia} from '../lib/device'
import {
	changePageOrientation,
	PAGE_ORIENTATION_LANDSCAPE,
	PAGE_ORIENTATION_PORTRAIT,
} from './features/App/duck'

const initialState = {}

const DevTools = createDevTools(
	<DockMonitor defaultIsVisible={false}
				 toggleVisibilityKey="ctrl-h"
				 changePositionKey="ctrl-q"
	>
		<LogMonitor theme="tomorrow" preserveScrollTop={false}/>
	</DockMonitor>
)

const store = create(reducer, initialState, [DevTools.instrument()], effects())
const history = syncHistoryWithStore(browserHistory, store)

const Projects = () => (
	<div>
		[List with all projects]

		<ul>
			<li><Link to="/">Close</Link></li>
		</ul>
	</div>
)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<YMInitializer accounts={[yandexMetrikaAccount]} version="2"/>
			
			<Router history={history}>
				<Route path="/" component={App}>
					<Route path="projects" component={Projects}/>
					<Route path="projects/:year/:name" component={Project}/>
				</Route>
			</Router>

			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root')
)

isLandscapeMedia.addListener((event) => {
	const orientation = event.matches
		? PAGE_ORIENTATION_LANDSCAPE
		: PAGE_ORIENTATION_PORTRAIT

	store.dispatch(changePageOrientation(orientation))
})
