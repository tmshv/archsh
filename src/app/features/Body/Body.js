import React, {Component} from 'react'
import classNames from 'classnames'

import './Body.css'

class Body extends Component {
	render() {
		const {fullPage, vertical} = this.props
		const styleClass = classNames('Body', {
			'Body--vertical': vertical,
			'Body--full': fullPage,
		})

		return (
			<div className={styleClass}>
				<main className="Body-content">
                    {this.props.children}
				</main>
			</div>
		)
	}
}

export default Body
