import './App.css';
import React from 'react';
import Menu from '../menu/Menu';
import Map from '../map/Map';
import Enigme from '../enigme/Enigme';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {};
		this.getNextPlace(true);
	}

	/**
	 * Récupère le prochain lieu à explorer
	 * @param first indique si on souhaite récupérer le premier lieu du parcours
	 */
	getNextPlace(first = false){
		// let fileParcours = JSON.parse("//%PUBLIC_URL%/parcours/ufr-st.json");
		// if(first){
		// 	for (let property in fileParcours.parcours) {
		// 		if(fileParcours.parcours[property].hasOwnProperty("depart")){
		// 			this.setState({lieu: property});
		// 			this.setState({enigme: fileParcours.enigme[fileParcours.parcours[property].enigme]});
		// 		}
		// 	}
		// }
		// console.log(this.state.enigme);
	}

	render(){
		return (
		<div className="App">
			<header className="App-header">
			<Menu/>
			<Map/>
			<Enigme/>
			</header>
		</div>
		);
	}
}

export default App;
