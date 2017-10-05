import React from 'react'
import {Link} from 'react-router'

import './AppWrapper.css'
import './AppWrapperHeader.css'
import './AppWrapperBody.css'
import './AppWrapperContent.css'

const Head = ({title, onToggleFullPage, showFullPageToggle, showControls = false}) => (
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
					{!showFullPageToggle ? null: (
						<button onClick={onToggleFullPage}>Full</button>
					)}
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

const AppWrapper = ({title, children, showControls, showFullPageToggle, onToggleFullPage}) => (
	<div className="AppWrapper">
		<Head
			title={title}
			showControls={showControls}
			onToggleFullPage={onToggleFullPage}
			showFullPageToggle={showFullPageToggle}
		/>

		<Body>{children}</Body>
	</div>
)

export default AppWrapper
