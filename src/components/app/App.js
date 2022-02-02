import React from 'react';

import Menu from '../menu/Menu';

import './App.css';

class App extends React.Component{
	render(){
		return (
			<div className="App">
				<header className="App-header">
					<Menu/>
				</header>
			</div>
		);
	}
} export default App;