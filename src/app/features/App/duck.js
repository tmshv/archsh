import {combineReducers} from 'redux'
import api from '../../../api'
import {pack} from '../../../lib/fn'

const FETCH_PROJECTS = 'arch/app/FETCH_PROJECTS'
const FOCUS_PROJECT = 'arch/app/FOCUS_PROJECT'
const TOGGLE_FULL_PAGE = 'arch/app/TOGGLE_FULL_PAGE'

export function fetchProjects() {
	return {
		type: FETCH_PROJECTS,
		async: api.projects.fetch()
			.then(pack('data'))
	}
}

export function focusProject(projectName) {
	return {
		type: FOCUS_PROJECT,
		projectName
	}
}

export function toggleFullPage() {
	return {
		type: TOGGLE_FULL_PAGE,
	}
}

const init = {
	items: [],
	total: 0,
	activeProject: null,
}

const initPage = {
	fullPage: false,
}

function projects(state = init, action) {
	switch (action.type) {
		case FETCH_PROJECTS: {
			const {items, total} = action.data
			return {...state, items, total}
		}

		case FOCUS_PROJECT: {
			const projectName = action.projectName
			const activeProject = state.items.find(p => p.name === projectName)

			return {...state, activeProject}
		}

		default:
			return state
	}
}

function page(state = initPage, action) {
	switch (action.type) {
		case TOGGLE_FULL_PAGE: {
			const fullPage = !state.fullPage

			return {...state, fullPage}
		}

		case FOCUS_PROJECT: {
			let fullPage = state.fullPage

			const projectName = action.projectName
			fullPage = !projectName
				? false
				: fullPage

			return {...state, fullPage}
		}

		default:
			return state
	}
}


export default combineReducers({
	projects,
	page,
})
