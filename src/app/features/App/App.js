import React, {Component} from 'react'
import './App.css'

import Map from '../Map'
import Body from '../Body'
import AppWrapper from './AppWrapper'
import {Route} from 'react-router'

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

	render() {
		const {projects, activeProject} = this.props

		//console.log("APP RENDER", this.props.routeParams)
		console.log("APP RENDER", this.props.children)

		//const projectName = this.props.routeParams.name
		//const project = projectName
		//	? activeProject
		//	: null

		if(!this.props.children) {
			this.props.focusProject()
		}

		const onClick = (name) => {
			console.log("APP ON CLICK", name)
			//
			//if (!name)

			const url = name
				? `/projects/${name}`
				: '/'
			this.props.push(url)
		}

		return (
			<div className="App">
				<Map projects={projects} onSelect={onClick} activeProject={activeProject}/>
				<AppWrapper>
					{this.props.children
						? <Body>{this.props.children}</Body>
						: null
					}

					{/*{activeProject*/}
					{/*? <Body/>*/}
					{/*: null*/}
					{/*}*/}
				</AppWrapper>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
