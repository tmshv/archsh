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
import {debounce} from '../../../lib/fn'
const hit = debounce(50, path => ym('hit', path))

const projectPath = project => `/projects/${project.name}`

function mapStateToProps(state) {
	return {
		projects: state.app.projects.items,
		activeProject: state.app.projects.activeProject,
		fullPage: state.app.page.fullPage,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		...actions,
		push: routerActions.push
	}, dispatch)
}

class App extends Component {
	componentDidMount() {
		this.props.fetchProjects()
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
		const {fullPage, toggleFullPage} = this.props
		const showControls = Boolean(activeProject)

		const title = activeProject
			? activeProject.title
			: defaultTitle

		return (
			<div className="App">
				<Map projects={projects} onSelect={this.onSelect} activeProject={activeProject}/>
				<AppWrapper
					title={title}
					showControls={showControls}
					onToggleFullPage={toggleFullPage}
				>
					{children
						? <Body fullPage={fullPage}>{children}</Body>
						: null
					}
				</AppWrapper>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
