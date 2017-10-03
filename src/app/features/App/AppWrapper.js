import React from 'react'
import {Link} from 'react-router'
import './AppWrapper.css'

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

const AppWrapper = ({title, children, showControls, onToggleFullPage}) => (
	<div className="AppWrapper">
		<Head
			title={title}
			showControls={showControls}
			onToggleFullPage={onToggleFullPage}
		/>

		<div className="AppWrapper-body">
			<div className="AppWrapper-content">
				{children}
			</div>
		</div>
	</div>
)

export default AppWrapper
