import React from 'react'
import './AppWrapper.css'

const App = ({title, children}) => (
	<div className="AppWrapper">
		<header className="AppWrapper-header">
			<h1>{title}</h1>
		</header>
		<div className="AppWrapper-body">
			<div className="AppWrapper-content">
				{children}
			</div>
		</div>
	</div>
)

export default App
