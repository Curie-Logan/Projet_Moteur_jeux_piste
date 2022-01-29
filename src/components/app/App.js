import React from 'react';

import './App.css';
import gameWrapper from '../../gameWrapper';

import Map from '../map/Map';
import Menu from '../menu/Menu';

class App extends React.Component{
	constructor(props) {
		super(props);
	}
	
	//TO DO --> reprise de parties
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