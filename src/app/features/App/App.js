import React, {Component} from 'react'
import './App.css'

import Map from '../Map'
import Body from '../Body'
import AppWrapper from './AppWrapper'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './duck'

function mapStateToProps(state) {
	return {
		projects: state.app.projects.items,
		activeProject: state.app.projects.activeProject,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

class App extends Component {
	componentDidMount() {
		this.props.fetchProjects()
	}

	render() {
		const {projects, activeProject} = this.props

		const onClick = (name) => {
			this.props.focusProject(name)
		}

		return (
			<div className="App">
				<Map projects={projects} onSelect={onClick} activeProject={activeProject}/>
				<AppWrapper>
					{activeProject
						? <Body/>
						: null
					}
				</AppWrapper>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
