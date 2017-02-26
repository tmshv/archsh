import React from 'react'
import './AppWrapper.css'

const App = ({children}) => (
	<div className="AppWrapper">
		<header className="AppWrapper-header">
			<h2>Архитектурные проекты Шлиссельбурга</h2>
		</header>
		<div className="AppWrapper-body">
			<div className="AppWrapper-content">
				{children}
			</div>
		</div>
		{/*<footer className="AppWrapper-footer">Foo Maps</footer>*/}
	</div>
)

export default App
