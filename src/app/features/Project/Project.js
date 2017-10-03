import React, {Component} from 'react'

import * as actions from '../App/duck'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import './Project.css'

const Loader = ({text = 'Loading'}) => <i>{text}</i>

const HTML = ({children}) => (
	<div dangerouslySetInnerHTML={{__html: children}}/>
)

function mapStateToProps(state) {
	return {
		project: state.app.projects.activeProject
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

class Project extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: null,
			contentUrl: null,
		}
	}

	componentDidMount() {
		const {project} = this.props
		if (project) this.initProject(project)
	}

	componentWillReceiveProps(nextProps) {
		const {project} = nextProps
		if (project) this.initProject(project)
	}

	initProject(project) {
		if (project.content) {
			this.setState({
				content: project.content,
			})
		} else if (project.contentUrl) {
			this.setState({
				contentUrl: project.contentUrl,
			})
			// return
			fetch(project.contentUrl)
				.then(res => res.text())
				.then(content => {
					this.setState({
						content,
					})
				})
		}
	}

	render() {
		const {content} = this.state
		if (!content) {
			return (
				<div className="Project">
					<Loader/>
				</div>
			)
		}

		return (
			<div className="Project">
				<div className="ProjectBody">
					<HTML>
					{content}
					</HTML>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
