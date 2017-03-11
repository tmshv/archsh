import {combineReducers} from 'redux'
import api from '../../../api'
import {pack} from '../../../lib/fn'

//import {browserHistory} from 'react-router'
import {routerActions} from 'react-router-redux'

const FETCH_PROJECTS = 'arch/app/FETCH_PROJECTS'
const FOCUS_PROJECTS = 'arch/app/FOCUS_PROJECTS'

export function fetchProjects() {
	return {
		type: FETCH_PROJECTS,
		async: api.projects.fetch()
			.then(pack('data'))
	}
}

export function focusProject(projectName) {
	//return dispatch => {
	//	const url = projectName
	//		? `/projects/${projectName}`
	//		: ''
	//	dispatch(routerActions.push(url))
	//}

	return {
		type: FOCUS_PROJECTS,
		projectName
	}
}

const init = {
	items: [],
	total: 0,
	activeProject: null,
}

function projects(state = init, action) {
	switch (action.type) {
		case FETCH_PROJECTS: {
			const {items, total} = action.data
			return {...state, items, total}
		}

		case FOCUS_PROJECTS: {
			const projectName = action.projectName
			const activeProject = state.items.find(p => p.name === projectName)

			return {...state, activeProject}
		}

		default:
			return state
	}
}

export default combineReducers({
	projects
})
