//import {zip} from '../lib/fn'

const map = fn => list => Promise.all(
	list.map(fn)
)

function zipBy (key, list1, list2) {
	const [small, other] = list1.length <= list2.length
		? [list1, list2]
		: [list2, list1]
	//return small.map((s, i) => [s, other[i]])

	return small.map(s => {
		const k = key(s)
		const o = other.find(i => key(i) === k)
		return [s, o]
	})
}

const zip = (list1, list2) => zipBy(i => i.properties.name, list1, list2)

const api = {
	projects: {
		fetch () {
			return Promise
				.resolve(['/points.geojson', '/areas.geojson'])
				.then(map(url => fetch(url)))
				.then(map(res => res.json()))
				.then(map(i => i.features))
				.then(([points, areas]) => {
					const items = zip(points, areas)
						.map(([point, area]) => ({
							location: point.geometry.coordinates.reverse(),
							//area: area.geometry.coordinates,
							area: area,
							name: point.properties.name,
							content: point.properties.content,
							contentUrl: point.properties.contentUrl,
						}))

					return {items, total: 100500}
				})
		}
	}
}

export default api
