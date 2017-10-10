import {zipBy} from '../lib/fn'
import {projectFiles} from '../config'

const mapAll = fn => list => Promise.all(
	list.map(fn)
)

function basename(path) {
	return path.replace(/.*\//, '')
}

function dirname(path) {
	return path.match(/.*\//)[0]
}

function remapImageSrc(base) {
	return html => {
		const element = document.createElement('div')
		element.innerHTML = html

		const imgs = [...element.querySelectorAll('img')]
		imgs.forEach(x => {
			const file = basename(x.src)
			x.src = `${base}${file}`
			return x
		})

		return element.innerHTML
	}
}

export function fetchContent(url) {
	const dir = dirname(url)

	return fetch(url)
		.then(res => res.text())
		.then(remapImageSrc(dir))
}


const api = {
	projects: {
		fetch () {
			return Promise
				.resolve(projectFiles)
				.then(mapAll(url => fetch(url)))
				.then(mapAll(res => res.json()))
				.then(mapAll(i => i.features))
				.then(([points, areas]) => {
					const zip = (list1, list2) => zipBy(i => i.properties.name, list1, list2)

					const items = zip(points, areas)
						.map(([point, area]) => ({
							...point.properties,

							location: point.geometry.coordinates.reverse(),
							area: area,
						}))
						.filter(x => Boolean(x.name))

					return {items, total: 100}
				})
		},
		fetchContent,
	}
}

export default api
