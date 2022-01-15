import React from 'react';

import './App.css';
import gameWrapper from '../../gameWrapper';

import Map from '../map/Map';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.gameW = new gameWrapper("bouloie.json");
		this.state = {};
	}
	
	//TO DO --> reprise de parties
	//Je crois qu'on devrait mettre la map et tout le reste dans une balise <main>
	render(){
		return (
		<div className="App">
			<header className="App-header">
				<Map resume={false} wrapper={this.gameW}/>
			</header>
		</div>
		);
	}
} export default App;