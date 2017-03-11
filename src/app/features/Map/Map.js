import React, {Component} from 'react'
import Leaflet from 'leaflet'

const tilePattern = 'http://185.185.68.103:4444/{z}/{x}/{y}.png'

const position = [59.943276365872194, 31.038522720336918];

const bounds = [
	[59.961670515807164, 31.085386276245117],
	[59.909211661692645, 31.00247383117676],
]

let baseballIcon = Leaflet.icon({
	iconUrl: 'marker.png',
	iconSize: [30, 30],
	iconAnchor: [6, 30],
	popupAnchor: [0, -30]
});

let map = null
let currentArea = null
let projectsLayer = null
let stripes = null

class MyMap extends Component {
	constructor(props) {
		super(props)
		this.onMapClick = this.onMapClick.bind(this)
	}

	componentDidMount() {
		this.map()

		projectsLayer = Leaflet.layerGroup()
		projectsLayer.addTo(map)

		const {projects, onSelect, activeProject} = this.props
		if (projects) this.initProjects(projects, onSelect)
	}

	onMapClick() {
		this.props.onSelect()
	}

	map() {
		map = Leaflet
			.map('map', {
				minZoom: 14,
				maxBounds: bounds,
				zoomControl: false,
				attributionControl: false,
			})
			.setView(position, 13)

		Leaflet
			.tileLayer(tilePattern, {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			})
			.addTo(map)

		stripes = new Leaflet.StripePattern({
			angle: 45,
			weight: 1,
			color: '#e11e1c',
		})
		stripes.addTo(map)

		map.on('click', this.onMapClick)
	}

	initProjects(projects, onSelect) {
		if(projectsLayer) {
			projectsLayer.clearLayers()

			projects.forEach(project => {
				const {location, area} = project

				const m = Leaflet.marker(location, {icon: baseballIcon})
				//m.addTo(map)
				m.addTo(projectsLayer)

				m.on('click', () => {
					if (!area) return
					onSelect(project.name)
				})
			})
		}
	}

	render() {
		const {projects, onSelect, activeProject} = this.props
		if (projects) this.initProjects(projects, onSelect)

		//console.log('MAP RENDER')
		//console.log(activeProject)

		if (currentArea) currentArea.clearLayers()
		if(activeProject) {
			const {area} = activeProject
			currentArea = Leaflet.geoJSON(area, {
				style: {
					color: '#e11e1c',
					weight: 3,
					opacity: 1,
					fillOpacity: .7,
					fillPattern: stripes,
				},
				onEachFeature: (feature, layer) => {
					map.fitBounds(layer.getBounds(), {
						//animate: true,
						//duration: 1.5,
						paddingTopLeft: [50, 40],
						paddingBottomRight: [1280 / 2, 10],
					})
				}
			})
			currentArea.addTo(map)
		}

		return (
			<div id="map"></div>
		)
	}
}

export default MyMap
