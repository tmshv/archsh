import React, {Component} from 'react'
import ym from 'react-yandex-metrika'
import './App.css'

import Map from '../Map'
import Body from '../Body'
import AppWrapper from './AppWrapper'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './duck'

import {routerActions} from 'react-router-redux'
import {title as defaultTitle} from '../../../config'
import {getVariable} from '../../../lib/style'
import {debounce} from '../../../lib/fn'
const hit = debounce(50, path => ym('hit', path))

const projectPath = project => `/projects/${project.name}`
const frameSize = isVertical => [window.innerWidth, window.innerHeight]
const frameSizeMultiplier = () => getVariable('--content-width-state-normal')
const landscapeProjectBounds = (width, height, ratio=frameSizeMultiplier()) => [
	[0, 0],
	[width * ratio, 0],
]
const portraitProjectBounds = (width, height, ratio=frameSizeMultiplier()) => [
	[0, 0],
	[0, width * ratio],
]

function mapStateToProps(state) {
	const {fullPage, isVertical, halfPageAvailable} = state.app.page

	return {
		projects: state.app.projects.items,
		activeProject: state.app.projects.activeProject,
		fullPage: halfPageAvailable
			? fullPage
			: true,
		showFullPageToggle: halfPageAvailable,
		isVertical,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		...actions,
		push: routerActions.push
	}, dispatch)
}

class App extends Component {
	constructor(props) {
		super(props)

		const frameWidth = 1280 // default value
		const frameHeight = 800 // default value

		this.state = {
			frameWidth,
			mapProjectBounds: landscapeProjectBounds(frameWidth, frameHeight),
		}
	}
	componentDidMount() {
		this.props.fetchProjects()
	}

	componentWillReceiveProps() {
		const {isVertical} = this.props
		const [frameWidth, frameHeight] = frameSize(isVertical)

		let mapProjectBounds = isVertical
			? portraitProjectBounds(frameWidth, frameHeight)
			: landscapeProjectBounds(frameWidth, frameHeight)

		this.setState({
			frameWidth,
			mapProjectBounds,
		})
	}

	componentDidUpdate(){
		const projectName = this.getProjectName()
		this.props.focusProject(projectName)

		hit(this.props.location.pathname)
	}

	getProjectName() {
		const params = this.props.params
		const {name, year} = params

		return name && year
			? `${year}/${name}`
			: null
	}

	getCurrentPath() {
		try {
			return this.props.routing.locationBeforeTransitions.pathname
		} catch (e) {
			return null
		}
	}

	onSelect = (project) => {
		const old = this.getCurrentPath()
		const path = project
			? projectPath(project)
			: '/'

		if (path !== old) this.props.push(path)
	}

	render() {
		const {children, projects, activeProject} = this.props
		const {fullPage, isVertical, showFullPageToggle, toggleFullPage} = this.props
		const showControls = Boolean(activeProject)

		const {mapProjectBounds} = this.state

		const title = activeProject
			? activeProject.title
			: defaultTitle

		return (
			<div className="App">
				<Map
					onSelect={this.onSelect}
					projects={projects}
					activeProject={activeProject}
					projectBounds={mapProjectBounds}
				/>
				<AppWrapper
					title={title}
					showControls={showControls}
					showFullPageToggle={showFullPageToggle}
					onToggleFullPage={toggleFullPage}
				>
					{children
						? <Body
							fullPage={fullPage}
							vertical={isVertical}
						>{children}</Body>
						: null
					}
				</AppWrapper>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
