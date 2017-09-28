import React, {Component} from 'react'

import './Body.css'

class Body extends Component {
	render() {
		return (
			<div className="Body">
				<main className="Body-content">
                    {this.props.children}
				</main>
			</div>
		)
	}
}

export default Body
