import React, {Component} from 'react'
import classNames from 'classnames'

import './Body.css'

class Body extends Component {
	render() {
		const {fullPage} = this.props
		const styleClass = classNames('Body', {
			'Body--full': fullPage
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
