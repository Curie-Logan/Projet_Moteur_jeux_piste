import React from 'react';

import './App.css';
import gameWrapper from '../../gameWrapper';

import Menu from '../menu/Menu';
import Map from '../map/Map';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.gameW = new gameWrapper("bouloie.json");
		this.state = {};
	}

	//Passer a map et enigme le lieu courrant
	//Passer a map les lieux déjà visité
	//Passer a map le(s) lieu(x) suivant(s)
	

	render(){
		return (
		<div className="App">
			<header className="App-header">
			<Map wrapper={this.gameW}/>
			</header>
		</div>
		);
	}
}

export default App;
