import React from 'react'
import {Link} from 'react-router'

import './AppWrapper.css'
import './AppWrapperHeader.css'
import './AppWrapperBody.css'
import './AppWrapperContent.css'

const Head = ({title, onToggleFullPage, showControls = false}) => (
	<header className="AppWrapperHeader">
		<div>
			{!showControls ? null : (
				<div className="controls">
					<Link to="/">←</Link>
				</div>
			)}
		</div>

		<div className="AppWrapperHeader-main">
			<h1>{title}</h1>
		</div>

		<div>
			{!showControls ? null : (
				<div className="controls">
					<button onClick={onToggleFullPage}>Full</button>
				</div>
			)}
		</div>
	</header>
)

const Body = ({children}) => (
	<div className="AppWrapperBody">
		<div className="AppWrapperContent">
			{children}
		</div>
	</div>
)

const AppWrapper = ({title, children, showControls, onToggleFullPage}) => (
	<div className="AppWrapper">
		<Head
			title={title}
			showControls={showControls}
			onToggleFullPage={onToggleFullPage}
		/>

		<Body>{children}</Body>
	</div>
)

export default AppWrapper
