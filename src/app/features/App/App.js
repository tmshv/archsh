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
        const params = this.props.params
        const {name, year} = params

        const projectName = name && year
            ? `${year}/${name}`
            : null
		this.props.focusProject(projectName)

		hit(this.props.location.pathname)
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
		const title = activeProject
			? activeProject.title
			: defaultTitle

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
				<AppWrapper title={title}>
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
