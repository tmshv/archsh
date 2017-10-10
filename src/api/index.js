import {zipBy} from '../lib/fn';
import {projectFiles} from '../config'

const mapAll = fn => list => Promise.all(
	list.map(fn)
)

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

					return {items, total: 100}
				})
		}
	}
}

export default api
