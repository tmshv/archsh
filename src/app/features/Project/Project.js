import React, {Component} from 'react'
import {Link} from 'react-router'

import * as actions from '../App/duck'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const Loader = ({text='Loading'}) => <i>{text}</i>

function mapStateToProps(state) {
    return {
        project: state.app.projects.activeProject
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

const HTML = ({children}) => (
    <div dangerouslySetInnerHTML={{__html: children}}/>
)

class Project extends Component {
    render() {
        const {project} = this.props
        if (!project) return null

        const content = project.content
            ? <HTML>{project.content}</HTML>
            : <Loader/>

        return (
            <div>
                {content}
                <ul>
                    <li><Link to="/projects">All Projects</Link></li>
                    <li><Link to="/">Close</Link></li>
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
