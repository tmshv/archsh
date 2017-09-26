import {zipBy} from '../lib/fn';

const mapAll = fn => list => Promise.all(
	list.map(fn)
)

const api = {
	projects: {
		fetch () {
			return Promise
				.resolve(['/points.geojson', '/areas.geojson'])
				.then(mapAll(url => fetch(url)))
				.then(mapAll(res => res.json()))
				.then(mapAll(i => i.features))
				.then(([points, areas]) => {
					const zip = (list1, list2) => zipBy(i => i.properties.name, list1, list2)

					const items = zip(points, areas)
						.map(([point, area]) => ({
							location: point.geometry.coordinates.reverse(),
							//area: area.geometry.coordinates,
							area: area,
							name: point.properties.name,
							content: point.properties.content,
							contentUrl: point.properties.contentUrl,
						}))

					return {items, total: 100}
				})
		}
	}
}

export default api
