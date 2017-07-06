import React, {Component} from 'react'
import './App.css'

import Map from '../Map'
import Body from '../Body'
import AppWrapper from './AppWrapper'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './duck'

import {routerActions} from 'react-router-redux'

function mapStateToProps(state) {
	return {
		projects: state.app.projects.items,
		activeProject: state.app.projects.activeProject,
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
		const projectName = this.props.params.name
		this.props.focusProject(projectName)
	}

	render() {
		const {children, projects, activeProject} = this.props

		const currentPath = () => {
			try {
				return this.props.routing.locationBeforeTransitions.pathname
			} catch (e) {
				return null
			}
		}

		const onClick = (project) => {
			const old = currentPath()
			const url = project
				? `/projects/${project.name}`
				: '/'

			if (url !== old) this.props.push(url)
		}

		return (
			<div className="App">
				<AppWrapper>
					{children
						? <Body>{children}</Body>
						: null
					}
				</AppWrapper>
				<Map projects={projects} onSelect={onClick} activeProject={activeProject}/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
