import React, {Component} from 'react'
import {Link} from 'react-router'

import * as actions from '../App/duck'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

class Project extends Component {
	componentDidMount() {
		const name = this.getName()
		this.props.focusProject(name)
	}

	getName(){
		const {routeParams} = this.props
		const name = routeParams.name
		return name || null
	}

	render () {
		const name = this.getName()

		return (<div>
			{name}
			<ul>
				<li><Link to="/projects">All Projects</Link></li>
				<li><Link to="/">Close</Link></li>
			</ul>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
