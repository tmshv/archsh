import React, {Component} from 'react'
// import {Link} from 'react-router'

import * as actions from '../App/duck'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import './Project.css'

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

        const {project} = this.props
        return (
            <div className="Project">
                <header>
                    <h1>{project.title}</h1>
                    <hr/>
                </header>

                <div className="ProjectBody">
                    <HTML>
                        {content}
                    </HTML>
                </div>

                {/*<div>*/}
                {/*<ul>*/}
                {/*<li><Link to="/projects">All Projects</Link></li>*/}
                {/*<li><Link to="/">Close</Link></li>*/}
                {/*</ul>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
