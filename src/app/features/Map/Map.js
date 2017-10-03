import React, {Component} from 'react'
import Leaflet from 'leaflet'
import {Map, Marker, TileLayer, GeoJSON, LayerGroup} from 'react-leaflet'
import {getBoundsOf} from '../../../lib/geo'

const tilePattern = 'http://{s}.tiles.shlisselburg.org/oreshek/1.0/{z}/{x}/{y}.png'
const attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
const position = [59.943276365872194, 31.038522720336918]

const bounds = [
	[59.961670515807164, 31.085386276245117],
	[59.909211661692645, 31.00247383117676],
]

const flagIcon = Leaflet.icon({
	iconUrl: '/marker.png',
	iconRetinaUrl: '/marker2x.png',
	iconSize: [30, 30],
	iconAnchor: [6, 30],
	popupAnchor: [0, -30]
})

export default class MyMap extends Component {

	constructor(props) {
		super(props)

		this.state = {
			frameWidth: 800,
		}
	}

	onMapClick = () => {
		const {onSelect} = this.props
		onSelect()
	}

	componentDidMount() {
		const frameWidth = window.innerWidth

		this.setState({
			frameWidth,
			framePadding: 50,
		})
	}

	createBoundsOptions() {
		const {frameWidth, framePadding} = this.state
		const frameSizeMultiply = 0.6

		return {
			paddingTopLeft: [framePadding, framePadding],
			paddingBottomRight: [frameWidth * frameSizeMultiply + framePadding, framePadding],
		}
	}

	render() {
		const {projects, onSelect, activeProject} = this.props

		const area = activeProject
			? activeProject.area
			: null
		const areaBounds = area
			? getBoundsOf(area)
			: null
		const options = {
			animate: true,
			center: position,
			maxBounds: bounds,
			minZoom: 15,
			maxZoom: 17,
			zoom: 15,
			zoomControl: false,
			onClick: this.onMapClick,
			boundsOptions: this.createBoundsOptions(),
		}
		if (areaBounds) options.bounds = areaBounds

		const areaStyle = {
			fillColor: '#e11e1c',
			weight: 2,
			color: '#e11e1c',
			fillOpacity: 0.1,
			// fillPattern: stripes,
		}

		const markers = projects
			.map((project, index) => (
				<Marker key={index}
						icon={flagIcon}
						position={project.location}
						onClick={(e) => {
							onSelect()
							onSelect(project)
						}}
				/>
			))

		return (
			<Map {...options}>
				<TileLayer
					url={tilePattern}
					attribution={attr}
					detectRetina={true}
				/>

				{!area ? null : (
					<GeoJSON data={area} style={areaStyle}/>
				)}

				{!markers.length ? null : (
					<LayerGroup>
						{markers}
					</LayerGroup>
				)}
			</Map>
		)
	}
}
