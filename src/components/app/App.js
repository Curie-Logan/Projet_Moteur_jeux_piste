import React from 'react';

import './App.css';
import gameWrapper from '../../gameWrapper';

import Map from '../map/Map';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.wrapper = new gameWrapper("bouloie.json");
	}
	
	//TO DO --> reprise de parties
	render(){
		return (
		<div className="App">
			<header className="App-header">
				<Map resume={false} wrapper={this.wrapper} geolocation= {true}/>
			</header>
		</div>
		);
	}
} export default App;